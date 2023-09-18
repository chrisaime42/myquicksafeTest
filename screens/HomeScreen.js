import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    LogBox,
    StatusBar, Platform, TextInput, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {colors, gs} from '../styles';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {LinearGradient} from "expo-linear-gradient";
import {mapDarkStyle} from "../model/mapData";
import {AuthContext} from "../navigation/AuthProvider";
import {apiUrl, SOCKET} from "../apiUrl";
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import moment from "moment";
import {Avatar} from "react-native-elements";
import RBSheet from 'react-native-raw-bottom-sheet';
import { SelectList } from 'react-native-dropdown-select-list'
import { useToast } from "react-native-toast-notifications";


const initialState = {
    latitude:  0, // 6.1585168
    longitude: 0, // 1.2600003
    latitudeDelta: 0.015,
    longitudeDelta: 0.0015,
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

const HomeScreen = ({navigation}) =>  {
    const toast = useToast();

    const data = [
       {
        value: "Accident mineur",
        key: 1,
        Description: "Aucun dommage sérieux, seulement des dommages matériels mineurs."
        },
        {
            value: "Accident légèrement blessant",
        key: 2,
        Description: "Des blessures mineures qui ne mettent pas en danger la vie, mais nécessitent peut-être des soins médicaux."
        },
        {
            value: "Accident modérément blessant",
        key: 3,
        Description: "Des blessures qui nécessitent une attention médicale immédiate, mais ne sont pas mortelles."
        },
        {
            value: "Accident blessant",
        key: 4,
        Description: "Des blessures graves mettant en danger la vie, mais qui ne sont généralement pas mortelles."
        },
        {
            value: "Accident grave",
        key: 5,
        Description: "Des blessures graves mettant en danger la vie et nécessitant une intervention médicale intensive."
        },
        {
            value: "Accident très grave",
        key: 6,
        Description: "Des blessures extrêmement graves mettant en danger la vie et nécessitant des soins médicaux intensifs."
        },
        {
            value: "Accident critique",
        key: 7,
        Description: "Des blessures critiques mettant en danger la vie et nécessitant une intervention médicale immédiate."
        },
        {
        value: "Accident majeur",
        key: 8,
        Description: "Des blessures massives et potentiellement mortelles, nécessitant une réponse d'urgence."
        },
        {
        value: "Accident catastrophique",
        key: 9,
        Description: "Des blessures catastrophiques avec de multiples victimes et nécessitant une réponse d'urgence à grande échelle."
        },
        {
        value: "Accident de niveau de désastre",
        key: 10,
        "Description": "Un accident extrêmement grave, entraînant une perte massive de vies, une destruction importante et une crise humanitaire."
        }
    ]
    
   
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gravite, setGravite] = useState(0);
    const [nombreEngins, setNombreEngins] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [textGravite, setTextGravite] = useState('');
    const [currentPosition, setCurrentPosition] = useState(initialState);

    const [openSetting, setOpenSetting] = useState(true)
    const [dataSend, setDataSend] = useState(false)
    const [currentPositionAdresse, setCurrentPositionAdresse] = useState(
        {
        ville: '',
        region: '',
        rue: '',
        name: ''
    });
    const sheet = React.useRef();

    const getLocationAsync = async() => {
        
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
           // console.log(" status", status)
            if (status !== 'granted') {
                toast.show('Autorisation refusée.', {type: "normal" })
              //  ToastAndroid.show('Autorisation refusée.', ToastAndroid.LONG)
               // console.log('Permission to access location was denied')
                return ;
            }
                // let location = await Location.getCurrentPositionAsync({});
                // console.log(location)
                toast.show('Recherche en cours ...', {type: "normal" })
               // ToastAndroid.showWithGravity('Recherche en cours ...', ToastAndroid.LONG, ToastAndroid.TOP)
                let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High,
                    maximumAge: 2000, timeout: 20000});
                // console.log(location)
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    });

                    for (let item of response) {
                        let city = `${item.city}`;
                        let region = `${item.region}`;
                        let rue = `${item.street}`;
                        let name = `${item.name}`;

                        setCurrentPositionAdresse({
                            ...currentPositionAdresse,
                            ville: city,
                            region: region,
                            rue: rue,
                            name: name
                        })
                    }
                    setCurrentPosition({
                        ...currentPosition,
                        latitude: latitude,
                        longitude: longitude
                    })

            }


        }catch (e) {
            console.log(e)
        }
    };

    LogBox.ignoreAllLogs(true)

    // Avoir  id user connecté
    const { user,logout } = useContext(AuthContext);
    const userID = JSON.parse(user)
    const id = userID.data.iduser;
    const prenom1 = userID.data.prenomuser;
    const nom1 = userID.data.nomuser;
    const usertype = userID.data.usertype;
    //save location
    const saveLatLong = async () => {
        if ( currentPosition.latitude === 0 ){
            toast.show('Actualiser votre position...', {type: "normal" })
           // ToastAndroid.show('Actualiser votre position...', ToastAndroid.LONG)
        }else {
           // bs.current.snapTo(0)
            sheet.current.open();
            await apiUrl.patch('users', {
                latuser: currentPosition.latitude,
                longuser: currentPosition.longitude,
                iduser: id
            } ).then(res => {
        //        console.log("update User: "+JSON.stringify(res.data))
            }).catch(e => {
                console.log(e)
            })
        }

    }

    // refresh location
   const  refresh = () => {
        setLoading(true)
        toast.show("Patientez svp ...", {type: "normal"})
      // ToastAndroid.show('Patientez svp ...', ToastAndroid.LONG)
        setTimeout(async () => {
            if ((currentPosition.latitude || currentPosition.longitude) === 0 ) {
               Alert.alert('AUTORISATION', 'autoriser QUICKSAFE à acceder à votre position...', [
                   {
                       text : 'ok!',
                       onPress: () =>  getLocationAsync(),
                       style: 'cancel'
                   }
               ])
            } else {
                await getLocationAsync()
            }
           setLoading(false)
        }, 2000)

    }
    // dataSend && dataSend == true  ? (
    //     setTimeout(async() => {
    //             await Notifications.scheduleNotificationAsync({
    //                 content: {
    //                 title: "Alerte prise en compte.. ",
    //                 body: '🧑‍🚒 Une equipe de sapeurs pompiers est en chemin...',
    //                // data: { data: 'goes here' },
    //                 },
    //                 trigger: { seconds: 2 },
    //             });
    //             setDataSend(false)
    //     }, 3500)) 
    //         : null
        
    // save and data accident au pompier
  
    

    const SEND_DATA_ACCIDENT = () => {

            if (!gravite || !nombreEngins) {
                toast.show("Verifier les données svp ...", {type: "normal",placement: "top"})
             //   ToastAndroid.showWithGravity('Verifier les données svp ...', ToastAndroid.LONG, ToastAndroid.TOP)
            } else {
                setLoading(true)
                //ToastAndroid.showWithGravity(' en cours...', ToastAndroid.LONG, ToastAndroid.TOP)
                sheet.current.close();
                setGravite(null)
                setNombreEngins(null)
                setTimeout( async () => {
                    try {
                        let iduser;
                        let gravity;
                        let engin;
                        let ville;
                        let region;
                        let rue;
                        let name;
                        let lat;
                        let long;
                        let created_at;

                        SOCKET.emit('sendData', {
                            iduser: id,
                            gravity: gravite,
                            engin: nombreEngins,
                            ville: currentPositionAdresse.ville,
                            region: currentPositionAdresse.region,
                            rue: currentPositionAdresse.rue,
                            name: currentPositionAdresse.name,
                            lat: currentPosition.latitude,
                            long: currentPosition.longitude,
                            created_at: moment()
                        });
                        await apiUrl.post('accidents', {
                            iduser: id,
                            graviteaccident: gravite,
                            nombredengins: nombreEngins,
                            ville: currentPositionAdresse.ville,
                            region: currentPositionAdresse.region,
                            rue: currentPositionAdresse.rue,
                            name: currentPositionAdresse.name,
                            lataccident: currentPosition.latitude,
                            longaccident: currentPosition.longitude
                        }).then(res => {
                       //     console.log("Data Accident : "+JSON.stringify(res.data))
                            if (res.data.code === 200) {
                                setDataSend(true);
                                toast.show("Votre alerte a été envoyée ...", {type: "normal"})
                                setTimeout(async () => {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                        title: "Alerte reçue",
                                        body: 'Traitement de donnée en cours ...',
                                       // data: { data: 'goes here' },
                                        },
                                        trigger: { seconds: 2 },
                                    });
                                },3000)
                                // setTimeout(async() => {
                                //     await Notifications.scheduleNotificationAsync({
                                //         content: {
                                //         title: "Alerte prise en compte.. ",
                                //         body: '🧑‍🚒 Une equipe de secours est en chemin...',
                                //         // data: { data: 'goes here' },
                                //         },
                                //         trigger: { seconds: 10 },
                                //     });
                                // }, 15000)
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    }catch (e) {
                        console.log(e)
                    }
                    setLoading(false)
                }, 3500)
                toast.show("en cours...", {type: "normal"})
            }
    }

   /*componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }*/



    //console.log(id)
    // fonction pour modifier la position de l'user
    const updateData = () => {
        if ((currentPosition.latitude || currentPosition.longitude) === 0 ) {
            Alert.alert('Verifier votre position svp' , 'reessayer encore s\'il vous plait...', [
                {
                    text : 'ok! Reessayer...',
                    onPress: () =>  getLocationAsync(),
                    style: 'cancel'
                }
            ])
        }  else {
            apiUrl.patch('users', {
                latuser: currentPosition.latitude,
                longuser: currentPosition.longitude,
                iduser: id
            } ).then(res => {
               // console.log("update User: "+JSON.stringify(res.data))
            }).catch(e => {
                console.log(e)
            })
        }
    }
// Options data must contain 'item' & 'id' keys

    // fonction de l'enregistrement des données de l'accident
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
               {/* <Text style={[styles.panelTitle, {fontFamily: 'Oswald-Bold'}]}>Formulaire</Text>*/}
                <Text style={[styles.panelSubtitle, { fontFamily: 'Oswald-Light'}]}>Renseigner correctement les données de l'accident</Text>
            </View>
            {/*Gravité de l'accident*/}

            <View style={{marginTop: 5, paddingHorizontal: 20, }}>
             <View>
                 <Text style={[ styles.textFamily, { color: colors.pink }]}> Gravité de l'accident  * /10 </Text>
             </View>
                <View style={{height: 50, borderRadius: 10}}>
                    <Picker
                        mode={"dialog"}
                        selectedValue={gravite}
                        onValueChange={(itemValue, itemPosition) => setGravite(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker>
                </View>

            </View>
            {/*Nombre d'engins */}
            <View style={{marginTop: 5, paddingHorizontal: 20}}>
                <Text style={[ styles.textFamily, { color: colors.pink }]}> Nombre d'engins  *</Text>
                <View style={{height: 50, borderRadius: 10}}>
                    <Picker
                        mode={"dialog"}
                        selectedValue={nombreEngins}
                        onValueChange={(itemValue, itemPosition) => setNombreEngins(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker>

                </View>

            </View>
            <View style={{paddingHorizontal: 20, marginVertical: 40, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{borderColor: colors.pink,
                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2,
                    alignItems: 'center', padding: 12, borderRadius: 10}}
                                  onPressIn={() => SEND_DATA_ACCIDENT()}>
                    <FontAwesome name="send-o" size={24} color="black" />
                    <Text style={{ fontFamily: 'Roboto-Bold',
                        textTransform: 'uppercase',
                        letterSpacing: 3,
                        }}>envoyer</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    
    useEffect(() => {
        setLoading(true);
        toast.show('Chargement...', { type: "normal" })
        //ToastAndroid.show('Chargement...', ToastAndroid.LONG)
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, [])

    return (

        <View style={styles.container}>

              <MapView
                   customMapStyle={mapDarkStyle}
                   zoomEnabled={true}
                   pitchEnabled={true}
                   showsUserLocation={true}
                   followsUserLocation={true}
                   showsCompass={true}
                   showsBuildings={true}
                   showsTraffic={true}
                   showsIndoors={true}
                   loadingEnabled={true}
                   toolbarEnabled={true}
                   showsScale={true}
                   zoomControlEnabled={false}
                   loadingBackgroundColor={colors.white}
                   loadingIndicatorColor={colors.pink}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.map}
                  region={{
                      latitude: currentPosition.latitude == 0 ? 6.1585168 : currentPosition.latitude ,
                      longitude: currentPosition.longitude == 0 ? 1.2600003 : currentPosition.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0015,
                  }}
             />
          {/* <BottomSheet
              ref={bs}
              snapPoints={[snapp, 0]}
              renderContent={renderInner}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}
          /> */}
          <TouchableWithoutFeedback onPressOut={Keyboard.dismiss}>
          <RBSheet
            customStyles={{ container: styles.sheet }}
            height={windowHeight /1.2}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            ref={sheet}
            >
            <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderTitle}>Signaler un accident</Text>
            </View>
            <View style={styles.sheetBody}>
                <View style={{alignItems: 'center'}}>
                    {/* <Text style={[styles.panelTitle, {fontFamily: 'Oswald-Bold'}]}>Formulaire</Text>*/}
                    <Text style={[styles.panelSubtitle, { fontFamily: 'Oswald-Light'}]}>Renseigner correctement les données de l'accident svp</Text>
                </View>
            <View style={styles.section}>
               {/*Nombre d'engins */}
            
            <View style={{ paddingHorizontal: 20}}>
                <Text style={[ styles.textFamily, { color: colors.pink }]}> Nombre d'engins  </Text>
                <View style={{height: 50,zIndex: 99, borderRadius: 10}}>
                    {/* <Picker
                        mode={"dialog"}
                        selectedValue={nombreEngins}
                        onValueChange={(itemValue, itemPosition) => setNombreEngins(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker> */}

                   <TouchableWithoutFeedback onPressOut={true}> 
                   <TextInput
                        keyboardType='number-pad' 
                        style={styles.input} 
                        placeholder='ex: 1'
                        autoCapitalize='none'
                        placeholderTextColor={colors.darkHl}
                        autoCorrect={false}
                        onChangeText={val => setNombreEngins(val)}
                     />
                   </TouchableWithoutFeedback>
                    
                </View>

            </View>
                {/*Gravité de l'accident*/}
            <View style={{marginTop: 5, paddingHorizontal: 20, }}>
             <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                 <Text style={[ styles.textFamily, { color: colors.pink }]}> Gravité de l'accident {'\t'}  </Text>
                 <Text style={{ fontSize: 25, fontWeight: "900" }}>{gravite && gravite} <Text style={[ styles.textFamily, { color: colors.pink }]}>/10</Text></Text> 
             </View>
                <View style={{height: 50, borderRadius: 10}}>
                    {/* <Picker
                        mode={"dropdown"}
                        selectedValue={gravite}
                        onValueChange={(itemValue, itemPosition) => setGravite(itemValue)}
                        itemStyle={{marginTop: -80}}
                        Style={{marginTop: -80}}
                    >
                        <Picker.Item label={"Choisir..."} value={null} />
                        <Picker.Item label={"1"} value={"1"} />
                        <Picker.Item label={"2"} value={"2"} />
                        <Picker.Item label={"3"} value={"3"} />
                        <Picker.Item label={"4"} value={"4"} />
                        <Picker.Item label={"5"} value={"5"} />
                        <Picker.Item label={"6"} value={"6"} />
                        <Picker.Item label={"7"} value={"7"} />
                        <Picker.Item label={"8"} value={"8"} />
                        <Picker.Item label={"9"} value={"9"} />
                        <Picker.Item label={"10"} value={"10"} />
                    </Picker> */}
                    <SelectList
                        data={data}
                        setSelected={(val) => setGravite(val)} 
                        save='key'
                        dropdownItemStyles={{ color: "#fff" }}
                        notFoundText="Aucun resultat !"
                        dropdownStyles={{ height: 400, marginBottom: 10 }}
                       
                     />
                  
                </View>

            </View>
            
            {/* <View style={{paddingHorizontal: 20, marginVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={{borderColor: colors.pink,
                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 2,
                    alignItems: 'center', padding: 12, borderRadius: 10}}
                                  onPressIn={() => SEND_DATA_ACCIDENT()}>
                    <FontAwesome name="send-o" size={24} color="black" />
                    <Text style={{ fontFamily: 'Roboto-Bold',
                        textTransform: 'uppercase',
                        letterSpacing: 3,
                        }}>envoyer</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ top: Platform.OS == "android" ? windowHeight * 0.3 : windowHeight * 0.2 }}>
            <TouchableOpacity style={styles.btn} onPressIn={() => SEND_DATA_ACCIDENT()}>
                <Text style={styles.btnText}>Envoyer</Text>
            </TouchableOpacity>
            </View>
            </View>
        </View>
      </RBSheet>
      </TouchableWithoutFeedback>

          <View style={{ flexDirection:  'row', justifyContent: 'space-between',
              width: windowWidth, position: 'absolute', top: 0, padding: 5  }}>
              <View>
                  <TouchableOpacity
                      style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 40,
                          paddingHorizontal: 20,
                          backgroundColor: colors.white,
                          borderWidth: 1,
                          borderRadius: 10,
                          padding: 5,
                          borderColor: colors.white,
                      }}
                      onPress={()=> navigation.openDrawer()}
                  >
                      <Ionicons name={"ios-menu"} size={24} color={colors.darkBg} />
                      <Text style={{ marginLeft: 10, color: colors.darkBg, textTransform: 'uppercase', fontFamily: 'Oswald-ExtraLight' }}> Quick safe</Text>
                  </TouchableOpacity>
              </View>

              <View >
                  <TouchableOpacity
                      style={{
                          alignItems: "center",
                          justifyContent: 'center',
                          marginTop: 38,
                          marginHorizontal: 10,
                          borderWidth: 1,
                          padding: 2,
                          backgroundColor: colors.pink,
                          borderRadius: 40,
                          borderColor: colors.pink,
                      }}
                      onPress={()=> navigation.navigate('Profile')}
                  >
                      <Avatar
                          size="small"
                          title={`${nom1[0]}${prenom1[0]}`}
                          titleStyle={{
                              shadowColor: colors.darkBg,
                              fontFamily: 'Teko-Medium',
                              shadowOffset:  { height: 3, width: 1},
                          }}
                          rounded
                          style={[styles.follow, { width: 40, height: 40,
                              borderRadius: 32,
                              opacity: 1,
                              shadowColor: colors.darkBg,
                              fontFamily: 'Teko-Bold',
                              shadowOffset:  { height: 3, width: 1},
                              shadowOpacity: 0.5,
                          }]}
                      >
                          <Avatar.Accessory  />
                      </Avatar>
                  </TouchableOpacity>
              </View>
          </View>


            <View style={{
                position: 'absolute',
                bottom: 160,
                right: 20
            }}>

                <LinearGradient  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 30,
                    borderColor: colors.pink,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderTopRadius: 200,
                    borderBottomRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}  colors={[colors.white, colors.white]} start={[0, 0]} end={[1, 1]} >
                    <TouchableOpacity onPress={() => refresh()} >
                        <MaterialIcons
                            name="refresh"
                            size={24}
                            color={colors.pink} />
                    </TouchableOpacity>
                </LinearGradient>
                <StatusBar barStyle={"light-content"} />
            </View>  
          {
              (currentPosition.latitude || currentPosition.longitude) !== 0
              ?
              (
                  <View style={{
                      position: 'absolute',
                      bottom: 100,

                  }}>

                      <TouchableOpacity
                          style={{
                              flexDirection: "row",
                              paddingHorizontal: 70,
                              marginTop: 40,
                              backgroundColor: colors.pink,
                              opacity: .8,
                              borderWidth: 1,
                              borderRadius: 20,
                              padding: 10,
                              borderColor: colors.pink,

                          }}
                          //onPress={() => this.setState({ modalVisible: true })}
                          onPress={() => {
                              saveLatLong()
                          }}
                      >
                          <Ionicons name={"ios-flash-outline"} size={24} color={colors.white} />
                          <Text style={{ color: colors.white, textTransform: 'uppercase', fontFamily: 'Oswald-Medium' }}> Signaler</Text>
                      </TouchableOpacity>
                      <StatusBar barStyle={"light-content"} />
                  </View>
              ) : (

                      <View style={{
                          position: 'absolute',
                          bottom: 100,
                          right: 20

                      }}>

                          <LinearGradient  style={{
                              width: 55,
                              height: 55,
                              borderRadius: 30,
                              borderColor: colors.pink,
                              borderWidth: StyleSheet.hairlineWidth,
                              borderTopRadius: 200,
                              borderBottomRadius: 100,
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}  colors={[colors.pink, colors.orangeLg]} start={[0, 0]} end={[1, 1]} >
                              <TouchableOpacity onPressIn={ () => getLocationAsync()} >
                                  <Ionicons name="md-location-outline" size={24} color={colors.white} />
                              </TouchableOpacity>
                          </LinearGradient>
                          <StatusBar barStyle={"light-content"} />
                      </View>
                  )
          }
          {
              loading ?
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <ActivityIndicator style={{
                      position: 'absolute', justifyContent: 'center',
                      alignItems: 'center', backgroundColor: colors.white,
                      width: 80, height: 80, borderRadius: 10
          }} size='large' animating={true} color={colors.pink}/>
              </View>
              : <></>
          }
          
      </View>  
  )
};


export default HomeScreen;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        paddingHorizontal: 16,
        borderRadius: 7,
        paddingVertical: 14,
         // fontFamily: 'Oswald-ExtraLight'
      },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.darkBg,
        marginTop: 10,
        backgroundColor: colors.darkBg,
      },
      btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
      },
    sheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },
    sheetHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingHorizontal: 24,
        paddingVertical: 14,
      },
      sheetHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
      },
      sheetBody: {
        paddingHorizontal: 12,
        paddingVertical: 12,
      },
      section: {
       // paddingTop: 12,
      },
      sectionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#b1b1b1',
        textTransform: 'uppercase',
        paddingHorizontal: 24,
        marginBottom: 8,
      },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1'
    },
    imageContainer: {
        ...gs.center,
        marginTop: 10,
        shadowColor: colors.darkBg,
        shadowOffset:  { height: 3, width: 1},
        shadowOpacity: 0.5,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center'
    },
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 450,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab :{ 
    //bottom: 10,
   // position: 'absolute',
   // margin: 20,
     // zIndex: 1,
    //right: 0,
      height: 60,
      //width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: 'transparent',

  },
  fabRefresh :{ 
    top: -40,
    zIndex: 1,
    position: 'absolute', 
    margin: 20, 
    right: 0,
    
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50
  },
    RigthCircle: {
        backgroundColor: colors.pink,
        position: 'absolute',
        width:  200,
        height: 210,
        borderRadius: 200,
        left:10,
        top: -40,

    },
    leftCircle: {
        backgroundColor: colors.orange,
        position: 'absolute',
        width:  200,
        height: 200,
        borderRadius: 100,
        left: -55,
        top: -60,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        height: windowHeight,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    textFamily: {
        fontFamily:  'Oswald-Light',
        fontSize: 15,
        marginHorizontal: -1,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        //elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 0,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
 });


