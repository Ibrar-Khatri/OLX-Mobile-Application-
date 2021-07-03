import React, {useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, View} from 'native-base';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/routers';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();

function UserScreen({navigation}) {
  let [isLogin, setIsLogin] = useState(true);

  let isUserLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      console.log('What is in jsonValue =====> ' + jsonValue);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      return jsonValue != null
        ? navigation.navigate('Main-Home-Screen')
        : setIsLogin(false);
    } catch (e) {
      console.log('Unable to check user login or not ====> ' + e);
    }
    console.log('Done.');
  };

  useEffect(() => {
    isUserLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <ActivityIndicator
          size="large"
          color="darslategray"
          animating={true}
          style={{marginTop: 300}}
        />
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="signin" component={SignIn} />
          <Stack.Screen name="signup" component={SignUp} />
        </Stack.Navigator>
      )}
    </>
  );
}

export default UserScreen;

const styles = StyleSheet.create({});
