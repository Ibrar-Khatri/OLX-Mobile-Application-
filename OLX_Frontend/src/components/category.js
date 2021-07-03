import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  FlatList,
} from 'react-native';

import {
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
  View,
  Card,
  CardItem,
} from 'native-base';
import {Link} from 'react-router-native';
import category from './categoryList';

function CategoryComponent({route, navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (navigation.isFocused()) {
      Alert.alert(
        'Quit without saving?',
        'Your progress on this ad will be lost',
        [
          {text: "Don't leave", style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ],
      );
      return true;
    }
  });

  return (
    <>
      <Header
        style={{backgroundColor: 'darkslategray'}}
        androidStatusBarColor="darkslategray">
        <Left>
          <Button
            transparent
            onPress={() =>
              Alert.alert(
                'Quit without saving?',
                'Your progress on this ad will be lost',
                [
                  {text: "Don't leave", style: 'cancel', onPress: () => {}},
                  {
                    text: 'Discard',
                    style: 'destructive',
                    onPress: () => navigation.goBack(),
                  },
                ],
              )
            }>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 2}}>
          <Title>What are you offering?</Title>
        </Body>
        <Right />
      </Header>
      <FlatList
        data={category.categoryList}
        keyExtractor={item => Math.random()}
        renderItem={({item}) => {
          return (
            <>
              <Card>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('sub-category', {
                      name: item.name,
                      subCategory: item.subCategory,
                    })
                  }>
                  <CardItem>
                    <Image
                      source={item.icon}
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                    <Text>{item.name}</Text>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </>
          );
        }}
      />
    </>
  );
}

export default CategoryComponent;

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
