import React, {createContext, useEffect, useState} from 'react';
import {View, StyleSheet, ToastAndroid, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from "../apiUrl";
import { useToast } from 'react-native-toast-notifications';

export const AuthContext = createContext();

export const AuthProvider = ({navigation,children}) => {
    const [user, setUser] = useState(null);
    const [userTokenId, setUserTokenId] = useState(null);
    const [isLoading, setIsloading] = useState(true);
    const toast = useToast();



    const storeToken = async (data) => {
        try {
            await AsyncStorage.setItem("userData", data);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    const remove = async () => {
        try {
            await AsyncStorage.removeItem('userData');
        }catch (e) {
            console.log(e);
        }finally {
            setUser('')
        }
    }
  return (
    <AuthContext.Provider value={{
        user,
        setUser,
        login: async(email, password) => {
            await apiUrl.post('users/login', {
                email: email,
                password: password
            }).then(response => {
                console.log(response.data)

              if (response.data.code == 208) {
                  toast.show('Email/Mot de passe incorrect', { type: "warning" })
              } else if (response.data.code == 200)  {
                    // console.log("connecter")
                     // ToastAndroid.showWithGravity(' Vous etes bien connecté...', ToastAndroid.LONG, ToastAndroid.TOP)
                      storeToken(JSON.stringify(response.data))
                      setUser(JSON.stringify(response.data))
                      //console.log("Login data: "+ user)

              } else if (response.data.code == 210)  {
                    toast.show('Email/Mot de passe incorrect... ', { type: "warning" })
                }
            }).catch(err => {
                console.log(err);
            });
        },
        register: async (firstName, lastName, telephone, adresse, email, personneContacter, selectedValue, password) => {
              const registerData = {
                  firstName: firstName,
                  lastName: lastName,
                  telephone: telephone,
                  adresse: adresse,
                  email: email,
                  personneContacter: personneContacter,
                  selectedValue: selectedValue,
                  password: password
              }
                await apiUrl.post('users/register', registerData).then(response => {

                    if ( response.data.code == 300 ) {
                        console.log(response.data)
                        toast.show(' Verifiez votre connexion internet svp...', { type: "danger" })

                    } else {
                        if (response.data.code == 302) {
                            //ToastAndroid.showWithGravity(' Votre compte a bien été crée...', ToastAndroid.LONG, ToastAndroid.TOP)
                           // console.log("compte a été creé")
                        }
                    }
                }).catch(error => {
                    console.log(error)
                });

        },
        logout: async () => {
            await remove();
        },
        userInfos: async (id) => {
            await apiUrl.get("users/:id", {
                params: {
                    id: id
                }

            }).then(response => {
                console.log(response.data)
            }).catch(e => {
                console.log(e)
            })
        },
    }}>
      {children}
    </AuthContext.Provider>
  );
};
