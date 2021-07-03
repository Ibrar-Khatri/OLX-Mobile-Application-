import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  Text,
  Icon,
  Tabs,
  // Tab,
  TabHeading,
  View,
} from 'native-base';
import {Link, NativeRouter, Route} from 'react-router-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreenAdd from './otherScreen/home';
import ChatScreen from './otherScreen/chat';
import MyAddScreen from './otherScreen/myAds';
import AccountScreen from './otherScreen/account';
import AddNewProductScreen from './otherScreen/addProductScreen';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        initialRouteName="home-screen"
        backBehavior="initialRoute"
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#96c0c0',
          style: {
            backgroundColor: 'darkslategray',
            height: 55,
            paddingBottom: 5,
          },
        }}>
        <Tab.Screen
          name="home-screen"
          component={HomeScreenAdd}
          options={{
            tabBarLabel: 'HOME',
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <Icon name="home" style={{color: 'white', fontSize: 32}} />
              ) : (
                <Icon name="home" style={{color: 'white', fontSize: 25}} />
              ),
            // tabBarVisible: ['search-screen'].includes(
            //   navigation.state.routeName,
            // ),
          }}
        />

        <Tab.Screen
          name="chat-screen"
          component={ChatScreen}
          options={{
            tabBarLabel: 'CHATS',
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <Icon
                  name="chatbubbles"
                  style={{color: 'white', fontSize: 32}}
                />
              ) : (
                <Icon
                  name="chatbubbles"
                  style={{color: 'white', fontSize: 25}}
                />
              ),
          }}
        />

        <Tab.Screen
          // options={{tabBarVisible: false}}
          // tabBarVisible={false}
          // options={{}}
          name="addProduct-screen"
          component={AddNewProductScreen}
          options={{
            tabBarLabel: 'SELL',
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                // <Image
                //   source={require('../../images/addIcon.png')}
                //   style={{
                //     height: 70,
                //     width: 70,
                //     marginTop: 10,
                //   }}
                // />
                <></>
              ) : (
                <Image
                  source={require('../../images/addIcon.png')}
                  style={{
                    height: 70,
                    width: 70,
                    marginTop: -30,
                  }}
                />
              ),
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="My Add"
          component={MyAddScreen}
          options={{
            tabBarLabel: 'MY ADS',
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <Icon name="heart" style={{color: 'white', fontSize: 32}} />
              ) : (
                <Icon name="heart" style={{color: 'white', fontSize: 25}} />
              ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'ACCOUNT',
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <Icon name="person" style={{color: 'white', fontSize: 32}} />
              ) : (
                <Icon name="person" style={{color: 'white', fontSize: 25}} />
              ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  iconStyle: {color: 'white', fontSize: 24},
  tabeHeadingStyle: {backgroundColor: 'darkslategray'},
  tabeHeadingText: {fontSize: 12, color: 'white'},
});
