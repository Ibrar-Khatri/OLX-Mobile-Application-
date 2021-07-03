import React from 'react';
import {StyleSheet, Image, TouchableOpacity, BackHandler} from 'react-native';
import {Container, Header, Content, Footer, Text} from 'native-base';
import {CommonActions} from '@react-navigation/native';

function ChatScreen({navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home-screen'}],
      }),
    );
    return true;
  });
  return (
    <>
      <Header
        style={{backgroundColor: 'darkslategray'}}
        androidStatusBarColor="darkslategray"
      />
      <Content>
        <Text>Chat Screeen</Text>
      </Content>
      {/* <CustomFooter />       */}
    </>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({});
