import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
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
  Footer,
  FooterTab,
} from 'native-base';
import {Link} from 'react-router-native';

function AddProduct({route, navigation}) {
  let [conditionNew, setConditionNew] = useState(false);
  let [conditionUsed, setConditionUsed] = useState(false);
  let [condition, setCondition] = useState('');
  let [type, setType] = useState('');
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [location, setLocation] = useState('');
  let [price, setPrice] = useState('');

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
          <Title>Include some details</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form style={{margin: 10}}>
          <Item style={styles.conditionButtonStyle}>
            <Button
              rounded
              dark
              bordered
              success={conditionNew}
              onPress={() => {
                setConditionNew(true);
                setConditionUsed(false);
                setCondition('New');
              }}
              style={{padding: 20, margin: 20}}>
              <Text>New </Text>
            </Button>
            <Button
              rounded
              dark
              bordered
              success={conditionUsed}
              onPress={() => {
                setConditionUsed(true);
                setConditionNew(false);
                setCondition('used');
              }}
              style={{padding: 20, margin: 20}}>
              <Text>Used</Text>
            </Button>
          </Item>
          <Item floatingLabel>
            <Label>Type</Label>
            <Input onChangeText={text => setType(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Ad title</Label>
            <Input onChangeText={text => setTitle(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Describe what are you selling</Label>
            <Input multiline={true} onChangeText={text => setDescription(text)} />
          </Item>
          <Item floatingLabel>
            <Label>Location</Label>
            <Input onChangeText={text => setLocation(text)} />
          </Item>

          <Item floatingLabel>
            <Label>Price</Label>
            <Input keyboardType='number-pad' onChangeText={text => setPrice(text)} />
          </Item>
        </Form>
      </Content>
      <Footer>
        <FooterTab style={{backgroundColor: 'darkslategray'}}>
          {(conditionUsed || conditionNew) &&
          type &&
          title &&
          description &&
          location &&
          price ? (
            <Button
              block
              onPress={() =>
                navigation.push('upload-image', {
                  category: route.params.category,
                  subCategory: route.params.subCategory,
                  condition: condition,
                  type: type,
                  title: title,
                  description: description,
                  location: location,
                  price: price,
                })
              }>
              <Text style={{fontSize: 15, color: 'white'}}>Next</Text>
            </Button>
          ) : (
            <Button
              disabled={true}
              block
              onPress={() => navigation.push('upload-image')}>
              <Text style={{fontSize: 15, color: 'white'}}>Next</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </>
  );
}

export default AddProduct;

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
