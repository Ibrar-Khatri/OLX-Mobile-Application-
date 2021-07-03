import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';

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
  Input,
  Icon,
} from 'native-base';
import category from '../../../../components/categoryList';
import ModalSelector from 'react-native-modal-selector';
// import {FlatList} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

function SearchScreen({route, navigation}) {
  let [search, setSearch] = useState('');
  let [searchedData, setSearchedData] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState(false);
  let [ads, setAds] = useState([]);
  let [showFilter, setShowFilter] = useState(false);
  let [searchedAds, setSearchedAds] = useState([]);

  useEffect(() => {
    setAds(route.params.ads);
    // console.log('++++' + ads)
  }, []);

  function searchDataByQuery() {
    let matchingData = ads.filter(ad => {
      let regularExpression = new RegExp(search, 'ig');
      if (ad.title.match(regularExpression)) {
        // console.log(''data matched');
        return true;
      }
      // console.log('nothing match');
      return false;
    });
    setSearchedAds(matchingData);
    setSearchedData(matchingData);
  }

  function filterData(category) {
    let matchingData = searchedData.filter(ad => {
      let regularExpression = new RegExp(category, 'ig');

      if (ad.category.match(regularExpression)) {
        // console.log('matched category');
        return true;
      }
      // console.log('nothing match');
      return false;
    });

    setSearchedAds(matchingData);
  }

  return (
    <>
      <Container>
        <Header
          style={{backgroundColor: 'darkslategray'}}
          searchBar
          rounded
          androidStatusBarColor="darkslategray">
          <TouchableOpacity
            onPress={() => navigation.navigate('ads-home-screen')}>
            <Icon
              name="arrow-back"
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                // marginLeft: 10,
                color: 'white',
                fontSize: 30,
              }}
            />
          </TouchableOpacity>
          <Item style={{borderRadius: 100, height: 35}}>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={text => setSearch(text)}
              value={search}
            />

            {search ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Icon name="close" />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </Item>
          {search ? (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory('');
                setShowFilter(true);
                searchDataByQuery();
              }}>
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
          ) : (
            <></>
          )}
        </Header>

        {/* <Content> */}
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            {showFilter ? (
              <>
                <Text>
                  <Text>Showing results for </Text>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {search}
                  </Text>
                </Text>
                <View>
                  <ModalSelector
                    data={category.categoryList}
                    onModalClose={item => {
                      if (item.name) {
                        // console.log('>>>>>> ' + item.name);
                        setSelectedCategory(true);
                        filterData(item.name);
                        // console.log(selectedCategory);
                      } else {
                        setSelectedCategory(false);
                        searchDataByQuery();
                      }
                    }}
                    keyExtractor={item => Math.random()}
                    labelExtractor={item => item.name}
                    animationType="fade"
                    optionContainerStyle={{backgroundColor: 'white'}}
                    optionTextStyle={{color: 'black'}}
                    cancelStyle={{backgroundColor: 'white'}}>
                    {selectedCategory ? (
                      <Image
                        source={require('../../../../images/filledFilterIcon.png')}
                        style={{height: 30, width: 30, marginTop: 5}}
                      />
                    ) : (
                      <Image
                        source={require('../../../../images/emptyFilterIcon.png')}
                        style={{height: 30, width: 30, marginTop: 5}}
                      />
                    )}
                  </ModalSelector>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </Card>

        <FlatList
          data={searchedAds}
          keyExtractor={item => item._id}
          numColumns={2}
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
      </Container>
    </>
  );
}

export default SearchScreen;
const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardStyle: {
    width: 170,
    marginBottom: 10,
  },
});
