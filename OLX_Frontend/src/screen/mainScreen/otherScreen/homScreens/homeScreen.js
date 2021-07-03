import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {
  Content,
  Text,
  View,
  Container,
  Card,
  CardItem,
  Left,
  Header,
  Item,
  Icon,
  Input,
} from 'native-base';
import axios from 'axios';
import appSettings from '../../../../../appSetting';
import {ActivityIndicator} from 'react-native';
// import {SafeAreaView} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';

function AllAdsHomeScreen({navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (navigation.isFocused()) {
      Alert.alert('Confirmation', 'Are you sure you want to Exit?', [
        {text: 'No', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    }
  });

  function sendRequestToGetAllAds() {
    axios
      .get(`${appSettings.Server_Hosted_Url}/add/get-all-ads`)
      .then(res => {
        if (res.data.status) {
          console.log('Ads found successfully ');
          setAds(res.data.ads);
        }
      })
      .catch(err => {
        console.log('Unable to get all ads');
      });
  }

  let [ads, setAds] = useState();
  useEffect(() => {
    sendRequestToGetAllAds();
  }, []);

  return (
    <>
      <Container>
        <Header
          style={{backgroundColor: 'darkslategray'}}
          searchBar
          rounded
          androidStatusBarColor="darkslategray">
          <Item
            style={{borderRadius: 100, height: 35}}
            onPress={() =>
              navigation.navigate('search-screen', {
                ads: ads,
              })
            }>
            <Icon name="ios-search" />
            {/* <Input placeholder="Search" /> */}
            <Text>Search</Text>
          </Item>
          <TouchableOpacity>
            <Text
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 10,
                color: 'white',
                fontSize: 15,
              }}>
              SEARCH
            </Text>
          </TouchableOpacity>
        </Header>
        {ads ? (
          <FlatList
            ListHeaderComponent={
              <View style={{marginTop: 15, marginLeft: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Fresh recommendations
                </Text>
              </View>
            }
            data={ads}
            keyExtractor={item => item._id}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <>
                  <Card style={styles.cardStyle}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('productDetails-screen', {ad: item})
                      }>
                      <CardItem>
                        <Image
                          source={{uri: item.imageUrls[0]}}
                          style={{
                            resizeMode: 'contain',
                            height: 100,
                            width: 100,
                            flex: 1,
                          }}
                        />
                      </CardItem>
                      <CardItem>
                        <Left>
                          <View>
                            <Text>RS {item.price}</Text>
                            <Text note>{item.title}</Text>
                          </View>
                        </Left>
                      </CardItem>
                    </TouchableOpacity>
                  </Card>
                </>
              );
            }}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color="darslategray"
            animating={true}
          />
        )}
      </Container>
    </>
  );
}

export default AllAdsHomeScreen;

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardStyle: {
    width: 170,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
});
