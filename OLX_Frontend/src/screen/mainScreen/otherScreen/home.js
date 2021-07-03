import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, BackHandler, Alert} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import AllAdsHomeScreen from './homScreens/homeScreen';
import SearchScreen from './homScreens/searchScreen';
import ProductDetails from './homScreens/productDetail';

let Stack = createStackNavigator();

function HomeScreenAdd({navigation}) {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ads-home-screen" component={AllAdsHomeScreen} />
        <Stack.Screen name="search-screen" component={SearchScreen} />
        <Stack.Screen name="productDetails-screen" component={ProductDetails} />
      </Stack.Navigator>
    </>
  );
}

export default HomeScreenAdd;

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  carStyle: {
    width: 170,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
});
