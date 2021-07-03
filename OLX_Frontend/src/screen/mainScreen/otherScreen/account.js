import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, BackHandler} from 'react-native';
import {
  Header,
  Content,
  Text,
  View,
  Button,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Right,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/routers';
import {TouchableOpacity} from 'react-native';

function AccountScreen({navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home-screen'}],
      }),
    );
    return true;
  });

  let logOut = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
    } catch (e) {
      console.log('Error in logout from localStorage =>>>' + e);
    }
    console.log('Done.');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Authentication-Screen'}],
      }),
    );
  };
  let getUserNameFromLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      if (jsonValue !== null) {
        let jsonParseValue = JSON.parse(jsonValue);
        // console.log('>>>>>>> ' + jsonParseValue.name);
        setName(jsonParseValue.name);
        setEmailID(jsonParseValue.email);
      }
      return jsonValue;
    } catch (e) {
      console.log('Unable to get username and email');
    }
    console.log('Done.');
  };

  useEffect(() => {
    getUserNameFromLocalStorage();
  });
  let [name, setName] = useState('');
  let [emailID, setEmailID] = useState('');
  return (
    <>
      <Header
        style={{backgroundColor: 'darkslategray'}}
        androidStatusBarColor="darkslategray">
        {/* <Left>
        {/* </Left> */}
        <Body>
          <Text style={{color: 'white'}}>Account</Text>
        </Body>
        <Right />
      </Header>
      <Content>
        <CardItem style={{marginTop: 30}}>
          <Left>
            <Thumbnail source={require('../../../images/userIcon.png')} />
            <Body>
              <Text>{name}</Text>
              <Text note>{emailID}</Text>
            </Body>
          </Left>
        </CardItem>
        <TouchableOpacity onPress={() => logOut()}>
          <CardItem style={{marginTop: 30}}>
            <Thumbnail
              source={require('../../../images/logOutIcon.png')}
              style={{height: 30, width: 30}}
            />
            <Text style={{marginLeft: 10}}>Logout</Text>
          </CardItem>
        </TouchableOpacity>
      </Content>
    </>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({});
