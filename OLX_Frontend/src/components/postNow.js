import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, ActivityIndicator} from 'react-native';
import {
  Header,
  Content,
  Text,
  Left,
  Button,
  Icon,
  Item,
  Input,
  Label,
  Body,
  Title,
  Right,
  List,
  ListItem,
  Thumbnail,
  Footer,
  FooterTab,
  View,
  Toast,
} from 'native-base';
import {CommonActions, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import appSettings from '../../appSetting';

function PostNow({route, navigation}) {
  let [name, setName] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [email, setEmail] = useState('');
  let [indicator, setIndicator] = useState(false);

  let getUserNameFromLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      if (jsonValue !== null) {
        let jsonParseValue = JSON.parse(jsonValue);
        // console.log('>>>>>>> ' + jsonParseValue.name);
        setName(jsonParseValue.name);
        setEmail(jsonParseValue.email);
      }
      return jsonValue;
    } catch (e) {
      console.log('Unable to get username and email');
    }
    console.log('Done.');
  };

  function saveProductDetais() {
    let addDetails = {
      category: route.params.category,
      subCategory: route.params.subCategory,
      condition: route.params.condition,
      type: route.params.type,
      title: route.params.title,
      description: route.params.description,
      location: route.params.location,
      price: route.params.price,
      userName: name,
      email: email,
      phoneNumber: phoneNumber,
    };
    let formData = new FormData();
    formData.append('addDetails', JSON.stringify(addDetails));

    route.params.images.forEach((image, i) => {
      formData.append(
        'images[]',
        JSON.stringify({
          base64: image.data,
          type: image.mime,
          name: `image${i}`,
        }),
      );
    });
    setIndicator(true);
    axios({
      method: 'post',
      url: `${appSettings.Server_Hosted_Url}/add/post-new-add`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(res => {
        setIndicator(false);
        if (res.data.status) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'home-screen'}],
            }),
          );
        }
        if (res.data.message) {
          navigation.goBack();
          Toast.show({
            text: res.data.message,
            buttonText: 'Okay',
            position: 'bottom',
          });
        }
      })
      .catch(err => {
        setIndicator(false);
        console.log('Error ===> ' + err);
      });
  }
  useEffect(() => {
    getUserNameFromLocalStorage();
  }, []);

  return (
    <>
      <Header
        style={{backgroundColor: 'darkslategray'}}
        androidStatusBarColor="darkslategray">
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 2}}>
          <Title>Review your details</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List style={{marginTop: 30}}>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require('../images/avatarIcon.png')} />
            </Left>
            <Body style={{borderColor: 'transparent'}}>
              <Item floatingLabel>
                <Label>Your Name</Label>
                <Input onChangeText={text => setName(text)} value={name} />
              </Item>
            </Body>
          </ListItem>
        </List>
        <View style={styles.phoneNumberViewStyle}>
          <Text>Phone Number</Text>
          <Input
            placeholder="number"
            keyboardType="number-pad"
            onChangeText={num => setPhoneNumber(num)}
            value={phoneNumber}
            style={styles.phoneNumberInputStyle}
          />
          <ActivityIndicator
            size="large"
            color="darslategray"
            animating={indicator}
          />
        </View>
      </Content>
      <Footer>
        <FooterTab style={{backgroundColor: 'darkslategray'}}>
          {name && phoneNumber.length === 11 ? (
            <Button block onPress={() => saveProductDetais()}>
              <Text style={{fontSize: 15, color: 'white'}}>Post Now</Text>
            </Button>
          ) : (
            <Button disabled={true} block>
              <Text style={{fontSize: 15, color: 'white'}}>Post Now</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </>
  );
}

export default PostNow;

const styles = StyleSheet.create({
  phoneNumberViewStyle: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
    borderColor: 'transparent',
  },
  phoneNumberInputStyle: {
    marginRight: 10,
    marginLeft: 10,
    borderColor: 'darkslategray',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 20,
  },
  conditionButtonStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
