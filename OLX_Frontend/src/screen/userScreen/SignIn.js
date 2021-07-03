import React, {useState} from 'react';
import {
  Alert,
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
import {CommonActions} from '@react-navigation/routers';

export default function SignIn({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPasssord] = useState('');
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
    if (!email) {
      return setIsInvalidEmail(true);
    }
    if (!password) {
      return setIsPswdEnetred(true);
    }
    setIsPswdEnetred(false);

    let data = {
      user: {email, password},
    };

    axios
      .post(`${appSettings.Server_Hosted_Url}/user/sign-in`, data)
      .then(res => {
        if (res.data.status) {
          savingUSerDetailsInLocalStorage(res.data.userDetails);
          navigation.navigate('Main-Home-Screen');
        }
      })
      .catch(err => {
        console.log('unable to post data ====>' + err);
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
              <Text style={styles.text02}>Signin to continue</Text>
            </View>
            <Form>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#c7cac1"
                style={styles.inputFeild}
                onChangeText={text => {
                  setEmail(text);
                }}
                value={email}
                onEndEditing={emailValidation}
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
                onPress={userInfo}
                rounded
                dark
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 30,
                }}>
                <Text style={styles.buttonField}>Sign In</Text>
              </Button>
            </Form>

            <View style={styles.textInLine}>
              <Text style={{color: '#c7cac1'}}>Don't have an account ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <View>
                  <Text style={{color: 'white'}}> SignUp</Text>
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
