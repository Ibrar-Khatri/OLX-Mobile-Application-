import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import {
  Header,
  Content,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Card,
  CardItem,
  Right,
} from 'native-base';
import {Link, Route} from 'react-router-native';

function SubCategory({route, navigation}) {
  let [category, setCategory] = useState('');
  let [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    setCategory(route.params.name);
    setSubCategory(route.params.subCategory);
  });
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
          <Title>{category}</Title>
        </Body>
        <Right />
      </Header>

      <FlatList
        data={subCategory}
        keyExtractor={item => Math.random()}
        renderItem={({item}) => {
          return (
            <>
              <Card>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('addproduct', {
                      category: category,
                      subCategory: item,
                    });
                  }}>
                  <CardItem>
                    <Text>{item}</Text>
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

export default SubCategory;

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
