import React, {useState} from 'react';
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
} from 'native-base';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

function UploadImage({route, navigation}) {
  let [imageSource, setImageSource] = useState([]);
  // console.log(route.params);
  function takeImages(condition) {
    if (condition === 'gallery') {
      setImageSource([]);
      ImagePicker.openPicker({
        multiple: true,
        includeBase64: true,
      }).then(images => {
        setImageSource(images);
        // console.log(imageSource);
      });
      return;
    }
    if (condition === 'camera') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        multiple: true,
      }).then(image => {
        setImageSource(prevArray => [...prevArray, image]);
      });
    }
  }

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
          <Title>Upload your photos</Title>
        </Body>
        <Right />
      </Header>

      {imageSource.length !== 0 ? (
        <DeckSwiper
          dataSource={imageSource}
          renderItem={item => (
            <Card style={{elevation: 3}}>
              <CardItem>
                <Image
                  style={{height: 200, flex: 1}}
                  source={{uri: item.path}}
                />
              </CardItem>
              <CardItem>
                <Left />
                <Body style={{alignItems: 'center'}}>
                  <Text>
                    {imageSource.findIndex(obj => obj.path === item.path) + 1}/
                    {imageSource.length}
                  </Text>
                </Body>
                <Right />
              </CardItem>
            </Card>
          )}
        />
      ) : (
        <Card style={{elevation: 3, height: 0}}>
          <CardItem style={{height: 220}}>
            <View
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 130,
                  width: 130,
                  flex: 1,
                }}
                source={require('../images/uploadImageIcon.png')}
              />
              <Text style={{textAlign: 'center', marginBottom: 10}}>
                Uploading more photos increase your chance of closing a deal
              </Text>
              <Text>Select three or more photos to continue</Text>
            </View>
          </CardItem>
        </Card>
      )}

      {/* select three or more photos to continue */}
      <View style={{marginTop: 300}}>
        <View style={{alignContent: 'center'}}>
          <TouchableOpacity onPress={() => takeImages('camera')}>
            <View
              style={{
                width: 200,
                marginLeft: 'auto',
                marginRight: 'auto',
                alignItems: 'center',
              }}>
              <Image
                source={require('../images/cameraIcon.png')}
                style={styles.cameraIcon}
              />
              <Text>TAKE A PICTURE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takeImages('gallery')}>
            <View
              style={{
                width: 200,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Image
                source={require('../images/galleryIcon.png')}
                style={styles.cameraIcon}
              />
              <Text>CHOOSE FROM GALLERY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Content />
      <Footer>
        <FooterTab style={{backgroundColor: 'darkslategray'}}>
          {imageSource.length > 2 ? (
            <Button
              block
              onPress={() =>
                navigation.push('post-now', {
                  category: route.params.category,
                  subCategory: route.params.subCategory,
                  condition: route.params.condition,
                  type: route.params.type,
                  title: route.params.title,
                  description: route.params.description,
                  location: route.params.location,
                  price: route.params.price,
                  images: imageSource,
                })
              }>
              <Text style={{fontSize: 15, color: 'white'}}>Next</Text>
            </Button>
          ) : (
            <Button
              disabled={true}
              block
              onPress={() => navigation.push('post-now')}>
              <Text style={{fontSize: 15, color: 'white'}}>Next</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </>
  );
}

const styles = StyleSheet.create({
  cameraIcon: {
    height: 60,
    width: 60,
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
});
export default UploadImage;
