// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import slides from '../slides';
// import { windowHeight } from '../utils/Dimentions';
// import {colors} from "../styles";
// import {LinearGradient} from "expo-linear-gradient";


// const OnboardingScreen = ({navigation}) => {


//   const  _renderItem = ({ item }) => {
//     return (
//       <LinearGradient colors={[colors.white, colors.white]}  style={{ flex: 1, backgroundColor: colors.white}}>
//         <Image source={item.image} 
//           style={{
//               resizeMode: "cover",
//               height: windowHeight / 1.6,
//               width: '100%'
//           }}
//         />
//            <Text style={styles.title}> {item.title} </Text>
//            <Text style={styles.description}> {item.description} </Text>
//       </LinearGradient>
//     );
//   }
//   const _renderNextButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <Icon
//           name="md-arrow-forward"
//           color="rgba(255, 255, 255, .9)"
//           size={24}
//         />
//       </View>
//     );
//   };
//   const _renderDoneButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <Icon
//           name="md-checkmark"
//           color="rgba(255, 255, 255, .9)"
//           size={24}
//           onPress={()=> navigation.navigate('Login')}
//         />
//       </View>
//     );
//   };

//   return(
//       <AppIntroSlider 
//         renderItem={_renderItem}
//         data={slides}
//         renderDoneButton={_renderDoneButton}
//         renderNextButton={_renderNextButton}
//         activeDotStyle={{
//           backgroundColor: "#21465b",
//           width: 30,
//         }}
//       />
//   );
// }

// export default OnboardingScreen;

// const styles = StyleSheet.create({
//   buttonCircle: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'rgba(0, 0, 0, .2)',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRightWidth: 5,
//   },
//   title: {
//      paddingTop: 25,
//      paddingBottom: 10,
//      fontSize: 23,
//      fontWeight: "bold",
//      color: "#21465b",
//      alignSelf: "center",
//      textTransform: "uppercase",
//       fontFamily: "Oswald-Light"
//   },
//   description: {
//     textAlign: "center",
//     color: colors.textSec,
//     fontSize: 15,
//     paddingHorizontal: 30,
//       fontFamily: "Oswald-ExtraLight"
//   }
// });
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '../styles';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/img.jpg")}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={[styles.content, ]}>
            <Text style={styles.title}>
             QUICKSAFE <Text style={{ fontFamily: "Oswald-Light", fontSize: 25, color: colors.grey }}>
             l'application qui vous protège en toutes circonstances.
             </Text> 
            </Text>
            {/* <Text style={styles.text}>
             Votre compagnon de sécurité mobile
            </Text> */}
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Commencer !</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1b1d1b',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    marginTop: 'auto',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold" ,
    color: '#fff',
    fontFamily: "Oswald-Bold",
    marginBottom: 24,
    textAlign: 'left',
  },
  text: {
    top: - 100,
    marginLeft: 5,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    color: "#fff",
    marginBottom: 8,
    alignSelf: "flex-start"
  },
  button: {
    minWidth: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 12,
   // backgroundColor: 'rgba(255,255,255,0.75)',
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});