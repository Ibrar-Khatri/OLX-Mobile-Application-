import React, {useEffect, useState} from 'react';
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
  View,
  DeckSwiper,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Container,
  Thumbnail,
} from 'native-base';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import axios from 'axios';
import appSettings from '../../../../../appSetting';
import {ActivityIndicator} from 'react-native';

function ProductDetails({route, navigation}) {
  function getProductDetails() {
    let data = {
      id: route.params.ad._id,
    };
    axios
      .post(`${appSettings.Server_Hosted_Url}/add/get-add-by-id`, data)
      .then(ad => {
        console.log('Posted data request' + ad.data.ad);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // let ad = route.params.ad;

  // let createdDate = new Date(ad.createdAt);
  // let date = createdDate.getDate();
  // let month = createdDate.getMonth() + 1;
  // let year = createdDate.getFullYear();

  // createdDate = date + '/' + month + '/' + year;

  useEffect(() => {
    getProductDetails();
  }, []);

  let [ad, setAd] = useState('');
  return (
    <>
      <Container>
        <ScrollView>
          {ad ? (
            <>
              <View>
                <TouchableOpacity
                  style={styles.backArrowStyle}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon
                    name="arrow-back"
                    style={{fontSize: 30, color: 'white', borderRadius: 100}}
                  />
                </TouchableOpacity>

                <DeckSwiper
                  dataSource={ad.imageUrls}
                  renderItem={item => (
                    <>
                      <Card style={{elevation: 3}}>
                        <CardItem style={{height: 260, marginBottom: 0}}>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              height: 250,
                              width: 250,
                              flex: 1,
                            }}
                            source={{uri: item}}
                          />
                        </CardItem>
                        <CardItem
                          style={{
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            marginTop: 0,
                            height: 50,
                          }}>
                          <Text style={{textAlign: 'center'}}>
                            {ad.imageUrls.findIndex(obj => obj === item) + 1}/
                            {ad.imageUrls.length}
                          </Text>
                        </CardItem>
                      </Card>
                    </>
                  )}
                />
              </View>
              <View style={{marginTop: 320}}>
                <Card>
                  <CardItem style={{paddingBottom: 0}}>
                    <Body>
                      <TouchableOpacity
                        style={{marginLeft: 280, marginBottom: -25}}>
                        <Image
                          source={require('../../../../images/emptyHeartIcon.png')}
                          style={{width: 30, height: 30}}
                        />
                      </TouchableOpacity>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        Rs {ad.price}
                      </Text>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        {ad.title}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Icon type="EvilIcons" name="location" />
                    <Text>{ad.location}</Text>
                  </CardItem>
                  <CardItem>
                    <Text>{createdDate}</Text>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem>
                    <Text>Details</Text>
                  </CardItem>
                  <CardItem
                    style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
                    <Left>
                      <Text>Price</Text>
                    </Left>
                    <Body />
                    <Right>
                      <Text>{ad.price}</Text>
                    </Right>
                  </CardItem>
                  <CardItem
                    style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
                    <Left>
                      <Text>Make</Text>
                    </Left>
                    <Body />
                    <Right>
                      <Text>{ad.type}</Text>
                    </Right>
                  </CardItem>
                  <CardItem
                    style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
                    <Left>
                      <Text>Condition</Text>
                    </Left>
                    <Body />
                    <Right>
                      <Text>{ad.condition}</Text>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        Description
                      </Text>
                      <Text>{ad.description}</Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={require('../../../../images/avatarIcon.png')}
                      />
                      <Body>
                        <Text>{ad.userName}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </View>
            </>
          ) : (
            <ActivityIndicator
              style={{marginTop: 250}}
              size="large"
              color="darslategray"
              animating={true}
            />
          )}
        </ScrollView>
      </Container>
    </>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  backArrowStyle: {
    backgroundColor: 'darkslategray',
    width: 32,
    height: 32,
    borderRadius: 100,
    zIndex: 1,
    marginBottom: -40,
    marginLeft: 10,
    marginTop: 10,
  },
});
