import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Text, View, Form, Button} from 'native-base';
import axios from 'axios';
import appSettings from '../../../appSetting';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}) {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPasssord] = useState('');

  let [isNameEnter, setIsNameEnter] = useState(false);
  let [isInvalidEmail, setIsInvalidEmail] = useState(false);
  let [isPswdEnetred, setIsPswdEnetred] = useState(false);

  function emailValidation() {
    let emailVali = new RegExp('@', 'ig');
    if (!email.match(emailVali)) {
      return setIsInvalidEmail(true);
    }
    return setIsInvalidEmail(false);
  }

  function userInfo() {
    if (!name) {
      return setIsNameEnter(true);
    }
    if (!email) {
      return setIsInvalidEmail(true);
    }
    if (!password) {
      return setIsPswdEnetred(true);
    }
    setIsNameEnter(false);
    setIsPswdEnetred(false);

    let data = {
      user: {name, email, password},
    };

    axios
      .post(`${appSettings.Server_Hosted_Url}/user/sign-up`, data)
      .then(res => {
        if (res.data.status) {
          savingUSerDetailsInLocalStorage(res.data.user);
          console.log('New user created succcessfully...');
          setName('');
          setEmail('');
          setPasssord('');
          navigation.navigate('Main-Home-Screen');
        }
        if (!res.data.status) {
          console.log('New user cannot be created successfully...');
        }
      })
      .catch(err => {
        console.log('unable to post data ====>', err);
      });

    return;
  }

  let savingUSerDetailsInLocalStorage = async value => {
    try {
      // const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify({
          name: value.name,
          email: value.email,
        }),
      );
    } catch (e) {
      console.log('Error in saving data in localStorage ====> ' + e);
    }
    console.log('Done.');
  };

  return (
    <>
      <View style={styles.screenBG}>
        <StatusBar barStyle="light-content" backgroundColor="darkslategray" />
        <View>
          <Image
            style={styles.olxImage}
            resizeMode="contain"
            source={require('../../images/olx_Icon.png')}
          />
          <View>
            <View>
              <Text style={styles.text01}>Welcome Back,</Text>
              <Text style={styles.text02}>Signup to continue</Text>
            </View>
            <Form>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#c7cac1"
                style={styles.inputFeild}
                onChangeText={text => {
                  setName(text);
                }}
                value={name}
              />
              {isNameEnter && (
                <Text style={{color: 'red', marginLeft: 20, marginTop: 0}}>
                  Please enter a name
                </Text>
              )}
              <TextInput
                placeholder="Email"
                placeholderTextColor="#c7cac1"
                style={styles.inputFeild}
                onChangeText={text => {
                  setEmail(text);
                }}
                onEndEditing={emailValidation}
                value={email}
              />
              {isInvalidEmail && (
                <Text style={{color: 'red', marginLeft: 20, marginTop: 0}}>
                  Please use a valid email address
                </Text>
              )}
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#c7cac1"
                style={styles.inputFeild}
                onChangeText={text => {
                  setPasssord(text);
                }}
                value={password}
              />
              {isPswdEnetred && (
                <Text style={{color: 'red', marginLeft: 20, marginTop: 0}}>
                  Please enter a password
                </Text>
              )}
              <Button
                rounded
                dark
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 30,
                }}
                onPress={userInfo}>
                <Text style={styles.buttonField}>Sign In</Text>
              </Button>
            </Form>

            <View style={styles.textInLine}>
              <Text style={{color: '#c7cac1'}}>Don't have an account ?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                  <Text style={{color: 'white'}}> SignIn</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenBG: {
    backgroundColor: 'darkslategray',
    height: '100%',
  },
  olxImage: {
    height: 120,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    paddingTop: 0,
  },
  text01: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginTop: 50,
  },
  text02: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#c7cac1',
    marginLeft: 20,
    marginBottom: 50,
  },

  inputFeild: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    margin: 10,
    borderColor: 'white',
    borderWidth: 3,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 100,
  },
  buttonField: {
    color: 'white',
    width: 300,
    textAlign: 'center',
  },

  textInLine: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
  },
});
