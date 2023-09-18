import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    FlatList,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {colors, gs} from "../styles";
import {AuthContext} from "../navigation/AuthProvider";
import {apiUrl} from "../apiUrl";
import {windowWidth} from "../utils/Dimentions";
import {LinearGradient} from "expo-linear-gradient";
import moment from "moment";
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
moment.locale('fr');

const lessons = [
    {
      img: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80',
      name: 'Squat',
      cal: 22,
      duration: 10,
    },
    {
      img: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Pull-up',
      cal: 12,
      duration: 15,
    },
    {
      img: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Push-up',
      cal: 12,
      duration: 5,
    },
    {
      img: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
      name: 'Calisthenics',
      cal: 33,
      duration: 12,
    },
    {
      img: 'https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
      name: 'Lunge',
      cal: 44,
      duration: 10,
    },
    {
      img: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2404&q=80',
      name: 'Squat',
      cal: 22,
      duration: 10,
    },
    {
      img: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Pull-up',
      cal: 12,
      duration: 15,
    },
    {
      img: 'https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Push-up',
      cal: 12,
      duration: 5,
    },
    {
      img: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
      name: 'Calisthenics',
      cal: 33,
      duration: 12,
    },
    {
      img: 'https://images.unsplash.com/photo-1632167764165-74a3d686e9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
      name: 'Lunge',
      cal: 44,
      duration: 10,
    },
  ];
  


const NotificationScreen = () => {
    // Avoir  id user connecté
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
         Description: "Un accident extrêmement grave, entraînant une perte massive de vies, une destruction importante et une crise humanitaire."
         }
     ]
    const navigation = useNavigation();


    const { user,logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [accident, setAccident] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const userID = JSON.parse(user)
    const id_accident = userID.data.iduser;
    const nom = userID.data.nomuser;
    const prenom = userID.data.prenomuser;
    const data_receipt = userID.data.dateaccident;
   
    

    useEffect(() => {
        ACCIDENT_BY_USER_ID();
    }, [])
  
    const onRefreshToButton = () => {
      return ACCIDENT_BY_USER_ID();
    }
       // get notifications user by user ID
    const ACCIDENT_BY_USER_ID = async () => {
     setLoading(true)
      try {
          await apiUrl.get('accidents/iduser/'+id_accident).then(res => {
              setRefreshing(false);
              const data = res.data.data;
              setAccident(data)
            setLoading(false)
            
          }).catch(e => {
              console.log(e)
          })
      }catch (e) {
          console.log(e)
          setLoading(false);
      }
}
  //  console.log("Data accident : "+ JSON.stringify(accident))
    const EmptyData = () => {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
          <Text>Aucune donnée</Text>
        </View>
      )
    }
    const NotificationCard = ({item}) => {
     
       const findGravity = () => {
        const found = data.find(val => val.key === item?.graviteaccident);
        return found.value 
      }
      const findDescription = () => {
        const found = data.find(val => val.key === item?.graviteaccident);
        return found.Description
      }
        return (
                <TouchableOpacity
                        style={styles.containerNew}
                        onPress={() => navigation.navigate("DetailNotification", {item}) }>
                    <View style={styles.card}>
                          <View style={styles.cardImg}> 
                            <FeatherIcon size={24}  color="#636a73" name="bell" />
                          </View>
                       
                        <View>
                            <Text style={styles.cardTitle}>{findGravity()}</Text>
        
                            <View style={styles.cardStats}>
                            <View style={styles.cardStatsItem}>
                                <FeatherIcon color="#636a73" name="clock" />

                                <Text style={styles.cardStatsItemText}>
                                signalé le {moment(item.dateaccident).format('D MMM YYYY')} {" à "} {moment(item.dateaccident).format("HH:mm z")}
                                </Text>
                            </View>
        
                            
                          </View>
                          <View style={[styles.cardStatsItem, { marginTop: 5 }]}>
                                <Text style={styles.cardStatsItemText}>{moment(item.dateaccident).fromNow()}... </Text>
                            </View>
                        </View>
        
                        <View style={styles.cardAction}>
                            <FeatherIcon color="#9ca3af" name="chevron-right" size={22} />
                        </View>
                        </View>
                    </TouchableOpacity>

        //    <View style={styles.cartCard} >
        //         <TouchableOpacity onPress={() => navigation.navigate("DetailNotification", { item })}>
        //             <Image source={require('../assets/icon-alerte.png')} style={{height: 20, width: 20, position: 'absolute', top: 0, }} />
        //             <View
        //                 style={{
        //                     height: 100,
        //                     marginLeft: 10,
        //                     paddingVertical: 20,
        //                     flex: 1,

        //                 }}>
        //                 <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'Oswald-Medium'}}>Gravité de l'accident</Text>

        //                 <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Oswald-Medium'}}>Nombres d'engins</Text>
        //                 <Text style={{fontSize: 10, color: colors.dark, fontFamily: 'Oswald-Medium'}}>
        //                     {item.lataccident && (`Lat: ${item.lataccident} Long : ${item.longaccident}`)}
        //                 </Text>
        //                 <Text style={{fontSize: 10, color: colors.dark, fontFamily: 'Oswald-Medium'}}>
        //                     {item.dateaccident && (`Date de l'accident: ${moment(`${item.dateaccident}`).format('LLLL')} `)}
        //                 </Text>
        //             </View>
        //             <View style={{marginRight: 20, alignItems: 'center', marginTop: -20}}>
        //             <View>
        //                 <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.graviteaccident}</Text>
        //             </View>       
        //             </View>
        //         </TouchableOpacity>    
        //     </View>
       
        );
    };
    return (
        <View style={styles.container}>
            <LinearGradient colors={[colors.pink, colors.orangeLg]} start={[0, 0]} end={[1, 1]} >
                <View style={{ marginHorizontal: 21, paddingVertical: 20 }}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10}}>
                        <Text style={[gs.subTitle, { fontFamily: 'Oswald-ExtraLight'}]}>MES NOTIFICATIONS</Text>
                    </View>
                </View>
            </LinearGradient>
            {refreshing ? <></> : null }
            <FlatList 
              contentContainerStyle={{backgroundColor: colors.light, marginBottom: 50}}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              ListEmptyComponent={<EmptyData />}
              data={accident}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={({item}) => <NotificationCard item={item} />}   
              refreshControl={
                <RefreshControl style={{ backgroundColor: "#f0f0f0" }} refreshing={refreshing} onRefresh={ACCIDENT_BY_USER_ID} />
              } 
          />
           {/* { accident && accident?.length == 0 
           ?
            (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
              <FeatherIcon color='rgba(2,2,2,0.3)' name="bell" size={24} />  
                <Text>No data found!</Text>
                <Button title='Actualiser' onPress={() => refreshing } />
              </View>
            )
            :   
            (<FlatList 
              contentContainerStyle={{backgroundColor: colors.light, marginBottom: 50}}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              ListEmptyComponent={<EmptyData />}
              data={accident}
              keyExtractor={(item, index) => 'key'+index}
              renderItem={({item}) => <NotificationCard item={item} />}   
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={ACCIDENT_BY_USER_ID} />
              } 
          />)
           } */}
        </View>
    );

}

const styles = StyleSheet.create({
    //
    containerNew: {
        paddingHorizontal: 10,
        padding: 24,
        marginVertical: -20,
      },
      title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        paddingBottom: 150,
      },
      card: {
        //paddingVertical: 12,
        marginTop: 5,
        padding: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#f0f0f0",
      },
      cardImg: {
        width: 50,
        height: 50,
        borderRadius: 9999,
        marginRight: 12,
        borderColor: colors.dark,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent:"center",
        alignItems: "center"
      },
      cardTitle: {
        fontSize:  windowWidth <= 375 ? 10 : 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
      },
      cardStats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      cardStatsItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
      },
      cardStatsItemText: {
        fontSize:  windowWidth <= 375 ? 9 : 13,
        fontWeight: '500',
        color: '#636a73',
        marginLeft: 2,
      },
      cardAction: {
        marginLeft: 'auto',
      },

    containerNotification: {
        paddingHorizontal: 24,

    },
    container: {
        flex: 1,
        backgroundColor: "transparent",
        paddingBottom: 80
    },
    safe_area_view: {
      flex: 1,
      paddingTop: 'android' === Platform.OS ? 35 : 0,
      backgroundColor: colors.white
    },
    headerQ: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
        marginTop: 20,
        padding: 10
    },
    fake_icon_box: {
        backgroundColor: '#e4e6eb',
        width: 30,
        height: 30,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll_view: {
      flex: 1
    },
    fake_post: {
      height: 250,
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 8
    },
    header: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    cartCard: {
        height: 100,
        width: windowWidth - 40,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: colors.textSec,
        marginVertical: 10,
        marginHorizontal: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 30,
        height: 30,
        borderBottomEndRadius: 20,
        backgroundColor: colors.pink,
        borderRadius: 50,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    imageContainer: {
        ...gs.center,
        marginTop: 10,
        shadowColor: colors.darkBg,
        shadowOffset:  { height: 3, width: 1},
        shadowOpacity: 0.5,
    },
    check: {
        ...gs.center,
        backgroundColor: colors.text,
        borderRadius: 100,
        width: 32,
        height: 32,
        shadowColor: colors.darkBg,
        shadowOffset: { height: 3, width: 1},
        shadowOpacity: 0.3,
        position: 'absolute',
        zIndex: 1,
        right: -10,
        bottom: 10

    },
    follow: {
        ...gs.button,
        ...gs.rowCenter,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 10,
        borderColor: "rgba(255,255,255,0.5)",
        borderWidth: 2
    },
    followText: {
        fontSize: 10,
        color: colors.text,
        fontWeight: "600",
        marginLeft: 4,
    }
});
export default NotificationScreen;
