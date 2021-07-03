// import React from 'react';
// import {StyleSheet, Image, TouchableOpacity} from 'react-native';
// import {Footer, FooterTab, Button, Text, Icon, View} from 'native-base';
// import {Link} from 'react-router-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// // import HomeScreenAdd from '../screen/mainScreen/otherScreen/';
// import {NavigationContainer} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// function CustomFooter() {
//   return (
//     <>
//       {/* <Footer> */}
//       {/* <FooterTab style={styles.tabeHeadingStyle}>
//           <Button>
//             <Link to="/" component={TouchableOpacity}>
//               <View style={{alignItems: 'center'}}>
//                 <Icon name="home" style={styles.iconStyle} />
//                 <Text style={styles.tabeHeadingText}>Home</Text>
//               </View>
//             </Link>
//           </Button>
//           <Button>
//             <Link to="/chat" component={TouchableOpacity}>
//               <View style={{alignItems: 'center'}}>
//                 <Icon name="chatbubbles" style={styles.iconStyle} />
//                 <Text style={styles.tabeHeadingText}>Chats</Text>
//               </View>
//             </Link>
//           </Button>
//           <Button>
//             <Link
//               component={TouchableOpacity}
//               to="/add-product"
//               style={{
//                 marginLeft: 'auto',
//                 zIndex: 1,
//                 marginRight: 'auto',
//                 marginBottom: 40,
//               }}>
//               <Image
//                 source={require('../images/addIcon.png')}
//                 style={{
//                   height: 70,
//                   width: 70,
//                 }}
//               />
//             </Link>
//           </Button>

//           <Button>
//             <Link to="/my-adds" component={TouchableOpacity}>
//               <View style={{alignItems: 'center'}}>
//                 <Icon name="heart" style={styles.iconStyle} />
//                 <Text style={styles.tabeHeadingText}>My Ads</Text>
//               </View>
//             </Link>
//           </Button>
//           <Button>
//             <Link to="/account" component={TouchableOpacity}>
//               <View style={{alignItems: 'center'}}>
//                 <Icon name="person" style={styles.iconStyle} />
//                 <Text style={styles.tabeHeadingText}>Acccount</Text>
//               </View>
//             </Li          </Button>
//         </FooterTab> */}
//       {/* <NavigationContainer> */}
//         <Tab.Navigator>
//           <Tab.Screen name="home-screen" component={HomeScreenAdd} />
//         </Tab.Navigator>
//         <Tab.Navigator>
//           <Tab.Screen name="chat-screen" component={HomeScreenAdd} />
//         </Tab.Navigator>
//         <Tab.Navigator>
//           <Tab.Screen name="addProduct-screen" component={HomeScreenAdd} />
//         </Tab.Navigator>
//         <Tab.Navigator>
//           <Tab.Screen name="myAds-screen" component={HomeScreenAdd} />
//         </Tab.Navigator>
//         <Tab.Navigator>
//           <Tab.Screen name="account-screen" component={HomeScreenAdd} />
//         </Tab.Navigator>
//       {/* </NavigationContainer> */}
//       {/* </Footer> */}
//     </>
//   );
// }
// export default CustomFooter;

// const styles = StyleSheet.create({
//   iconStyle: {color: 'white', fontSize: 24},
//   tabeHeadingStyle: {backgroundColor: 'darkslategray'},
//   tabeHeadingText: {fontSize: 12, color: 'white'},
// });
