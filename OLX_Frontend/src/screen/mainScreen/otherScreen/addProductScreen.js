import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Form,
  Item,
  Input,
  Label,
  Picker,
} from 'native-base';
import {Link, NativeRouter, Route} from 'react-router-native';
import CategoryComponent from '../../../components/category';
import SubCategory from '../../../components/subCategory';
import AddProduct from '../../../components/productDetails';
import UploadImage from '../../../components/uploadImage';
import PostNow from '../../../components/postNow';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function AddNewProductScreen() {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="category" component={CategoryComponent} />
        <Stack.Screen name="sub-category" component={SubCategory} />
        <Stack.Screen name="addproduct" component={AddProduct} />
        <Stack.Screen name="upload-image" component={UploadImage} />
        <Stack.Screen name="post-now" component={PostNow} />
      </Stack.Navigator>
    </>
  );
}

export default AddNewProductScreen;

const styles = StyleSheet.create({
  conditionButtonStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
