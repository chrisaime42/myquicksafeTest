import React, {useContext, useState} from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    ActivityIndicator,
    Platform,
    SafeAreaView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { windowHeight } from '../utils/Dimentions'
import { colors } from '../styles';
import {AuthContext} from "../navigation/AuthProvider";
import {StatusBar} from "expo-status-bar";
import { useToast } from 'react-native-toast-notifications';
import { KeyboardAvoidingView } from 'react-native-web';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const  LoginScreen = ({navigation}) => {
  const toast = useToast();
    const { logout, login, user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandle = async (username, password) => {
        if (!username && !password) {
            toast.show("Vérifiez les champs svp...", { type: "warning", placement: "top"})
          //  ToastAndroid.showWithGravity('Vérifiez les champs svp...', ToastAndroid.LONG, ToastAndroid.TOP)
        } else {
            toast.show("Connexion en cours..", { type: "normal"})
          //  ToastAndroid.showWithGravity(' Connexion en cours..', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            setTimeout(() => {
                login(username, password)
            }, 2500)
        }

    }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.RigthCircle} />
      <View style={styles.leftCircle} />
      <KeyboardAwareScrollView  enableOnAndroid={true}>
          <StatusBar hidden={true}  />
        
            <View style={{ marginVertical: windowHeight * 0.2 }}>
              <Text style={styles.titleLgoin}>Quick Safe</Text>
              <Text style={styles.subTitle}>Connectez-vous à votre compte</Text>
            </View>
            <View style= {{ marginTop: -windowHeight * 0.2 }}>
                  <TextInput keyboardType='email-address' 
                    style={styles.input} 
                    placeholder='Votre email'
                    autoCapitalize='none'
                    placeholderTextColor={colors.pink}
                    autoCorrect={false}
                    onChangeText={text => setUsername(text)}
                  />
                  <TextInput 
                      secureTextEntry={true}
                      style={styles.input}
                      placeholderTextColor={colors.pink}
                      placeholder='Votre Mot de passe'
                      onChangeText={text => setPassword(text)}
                  />
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity style={styles.continue} onPress={() => loginHandle(username, password)}>
                  <Ionicons name="md-arrow-forward" size={24} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ alignSelf: "center" }}>
                  <Text style={styles.txtAccount}>Pas de compte ? <Text style={{ color: colors.orange}}> Inscrivez-vous</Text></Text>
                </TouchableOpacity>
            </View>
              
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen

const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.dark
      },
      header: {
        fontWeight: '800',
        fontSize: 30,
        color: colors.darkBg,
        marginTop: 32,
          fontFamily: 'Oswald-ExtraLight'
      },
      input: {
        marginTop: 20,
        height: 70,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.pink,
        borderRadius: 30,
        paddingHorizontal: 16,
        color:colors.white,
        fontWeight: '600',
        padding: 10,
        fontSize: 18
         // fontFamily: 'Oswald-ExtraLight'
      },
      continue: {
        height: 70,
        width: 60,
        marginTop: 30,
        borderRadius: 60 / 2,
        borderBottomEndRadius: 80,
        backgroundColor: colors.pink,
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      txtAccount: {
        color: colors.white,
        marginTop: 20,
        fontSize: 17,
          fontFamily: 'Oswald-Light'
      },
      RigthCircle: {
        backgroundColor: colors.pink,
        position: 'absolute',
        width:  200,
        height: 210,
        borderRadius: 200,
        left:10,
        top: Platform.OS == "android" ?  -40 : - 90,
        
      },
      leftCircle: {
        backgroundColor: colors.orange,
        position: 'absolute',
        width:  200,
        height: 200,
        borderRadius: 100,
        left: -55,
        top: Platform.OS == "android" ? -60 : - 90,
      },
      titleLgoin: {
        textTransform: 'uppercase',
        color: colors.white,
        fontSize: Platform.OS == "android" ? 70 : 50,
        letterSpacing: -5,
        fontFamily: 'Oswald-ExtraLight'
      },
      subTitle: {
        color: colors.white,
        fontSize: 20,
        opacity: .4,
        fontFamily: 'Oswald-ExtraLight'
      }
})