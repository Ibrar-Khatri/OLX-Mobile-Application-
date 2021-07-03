import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from 'react-native';
import {
  View,
  Container,
  Header,
  Content,
  Footer,
  Text,
  Body,
  Right,
  CardItem,
  Left,
  Card,
} from 'native-base';
import {CommonActions} from '@react-navigation/routers';
import axios from 'axios';
import appSettings from '../../../../appSetting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';

function MyAddScreen({route, navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home-screen'}],
      }),
    );
    return true;
  });

  let getUserDetailsFromLocalStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      if (jsonValue !== null) {
        let jsonParseValue = JSON.parse(jsonValue);
        getAllMyAds(jsonParseValue.email);
        console.log(jsonParseValue.email);
      }
      return jsonValue;
    } catch (e) {
      console.log('Unable to get username and email');
    }
    console.log('Done.');
  };

  function getAllMyAds(email) {
    let data = {
      email: email,
    };
    axios
      .post(`${appSettings.Server_Hosted_Url}/add/get-my-ads`, data)
      .then(ads => {
        setAds(ads.data.ads);
        console.log(ads.data.ads);
      })
      .catch(err => {
        console.log(err);
      });
  }

  let [ads, setAds] = useState([]);

  useEffect(() => {
    getUserDetailsFromLocalStorage();
  }, []);
  return (
    <>
      <Header
        style={{backgroundColor: 'darkslategray'}}
        androidStatusBarColor="darkslategray">
        <Body>
          <Text style={{color: 'white'}}>My Adds</Text>
        </Body>
        <Right />
      </Header>

      {ads ? (
        <FlatList
          data={ads}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            console.log('++++' + item.title);
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
                          height: 150,
                          width: 150,
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
          animating={indicator}
        />
      )}
    </>
  );
}

export default MyAddScreen;

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
