import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../styles';
import { mapDarkStyle } from '../model/mapData';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
moment.locale('fr');


const DetailsNotification = ({}) => {
  const insets = useSafeAreaInsets()
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
  const route = useRoute();
  const {item} = route.params
  const sheet = React.useRef();
  const [value, setValue] = React.useState();
  const lat = parseFloat(item?.lataccident) 
  const long = parseFloat(item?.longaccident)
  const [tasks, setTasks] = React.useState([
    {
      label: 'Alerte en cours de traitement...',
      date: new Date(item?.dateaccident),
      icon: '📅',
      completed: true,
    },
    {
      label: 'Intervention d\'urgence ',
      date: new Date(item?.dateaccident),
      icon: '🎯',
      completed: false,
    },
    {
      label: 'Évacuation et secours',
      date: new Date(item?.dateaccident),
      icon: '👥',
      completed: false,
    },
    // {
    //   label: 'Gather project requirements',
    //   date: new Date('2023-01-30'),
    //   icon: '📝',
    //   completed: false,
    // },
    // {
    //   label: 'Create project budget',
    //   date: new Date('2023-01-15'),
    //   icon: '💰',
    //   completed: false,
    // },
  ]);
  const [form, setForm] = React.useState({
    side: '',
    temperature: '',
  });
  const [mapRegion, setmapRegion] = useState({
    latitude: parseFloat(item?.lataccident) ,
    longitude: parseFloat(item?.longaccident),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const handleUpdateTask = index => {
    setTasks(
      [...tasks].map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    );
  };

 const findGravity = () => {
  const found = data.find(val => val.key === item?.graviteaccident);
  return found.value
 }
 const findDescription = () => {
  const found = data.find(val => val.key === item?.graviteaccident);
  return found.Description
 }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.actionContainer, { top: Platform.OS == 'android' ? insets.top : '' }]}>
          <SafeAreaView>
            <View style={styles.actionWrapper}>
              <TouchableOpacity
                onPress={() => navigation.goBack() }
                style={{ marginRight: 'auto' }}>
                <View style={[styles.action, styles.actionFilled]}>
                  <FeatherIcon color="#000" name="chevron-left" size={22} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('CallService') }>
                <View style={[styles.action, styles.actionFilled, { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "auto", paddingHorizontal: 12}]}>
                  <FeatherIcon color={"green"} name="phone" size={22} /> 
                  <Text style={{ fontWeight: "600"}}>{" "} Appelez</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.action}>
                  <FeatherIcon color="#fff" name="message-square" size={22} />
                </View>
              </TouchableOpacity> */}
            </View>
          </SafeAreaView>
      </View> 
      <StatusBar barStyle={'default'}  />
            <MapView
              syyle={[styles.map]}
              mapType={Platform.OS == "android" ? "terrain" : "mutedStandard"}
              //mapType='mutedStandard'
              customMapStyle={mapDarkStyle}
              zoomEnabled={true}
              pitchEnabled={true}
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
              style={{ alignSelf: 'stretch', height: '40%'}}
              region={mapRegion}
            >
            <Marker coordinate={mapRegion} title='Marker' >
                {/* <Image source={require('../assets/user-.png')} style={{ height: 20, width: 20}} /> */}
                <Callout
                  tooltip={true}
                >
                  <Text>Zone accidentée</Text>
                </Callout>
              </Marker>
             
            <Circle
              center={{
                latitude: lat,
                longitude: long, 
              }}
              strokeColor='red'
              strokeWidth={2}
              fillColor='rgba(100,0,0, 0.5)'
              radius={1000}
             />
          </MapView> 
          <View  style={[styles.container, { backgroundColor: '#fff', top: -40, zIndex: 2, borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1,  }]}
          >
            <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false}>
            <View> 
            <View style={styles.row}>
                <Text style={styles.rowField}>Date</Text>
                <Text style={styles.rowValue}> {moment(item?.dateaccident).format('LL')} {" à "} {moment(item?.dateaccident).format("HH:mm")}  </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowField}>Etat</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{findGravity()}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowField}>Region</Text>
                  <Text style={styles.rowValue}>{item?.region || 'Maritime'}</Text>
              </View> 
              <View style={styles.row}>
                <Text style={styles.rowField}>Ville</Text>
                  <Text style={styles.rowValue}>{item?.ville || 'Lomé'}</Text>
              </View>
              <View style={styles.row}>
                  { item?.name ?
                    <>
                    <Text style={styles.rowField}>Quartier</Text>
                    <Text style={styles.rowValue}>{item?.name}</Text>
                    </>
                    : <></>
                  }
              </View>
              <Text style={styles.subtitle}>Description</Text>
              <Text style={styles.paragraph}>
              {findDescription()}
              </Text>
              <Text style={styles.subtitle}>Status</Text>
              {tasks.map(({ label, date, icon, completed }, index) => {
                const isActive = completed === true;
                const dateFormatted = date.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
                const description = completed ? `Terminé le ${dateFormatted}, ${moment(item?.dateaccident).fromNow()} ` : ""//""`Started on ${dateFormatted}`;
                return (
                  <TouchableOpacity
                    disabled={true}
                    key={index}
                    onPress={() => {
                      handleUpdateTask(index);
                    }}>
                    <View style={[styles.radio, isActive && styles.radioActive]}>
                      <View style={[styles.radioCheck, isActive && styles.radioCheckActive]}>
                        <FontAwesome color="#fff" name="check" style={!isActive && { display: 'none' }} size={11} />
                      </View>

                      <View>
                        <Text style={styles.radioLabel}>{label}</Text>

                        <Text style={styles.radioDescription}>{description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            </ScrollView>
            
        </View>
        
    </View>
  );
}

export default DetailsNotification;

const styles = StyleSheet.create({
  
  map: {
    ...StyleSheet.absoluteFillObject,
  },
   // body
   badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa500',
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  radioWrapper: {
    marginLeft: 0,
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 5,
  },
  radioCheck: {
    marginTop: 4,
    marginRight: 12,
    marginBottom: 0,
    marginLeft: 6,
    width: 24,
    height: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eb3333',
  },
  radioCheckActive: {
    backgroundColor: '#eb3333',
  },
  radio: {
    position: 'relative',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  radioDescription: {
    fontSize:  windowWidth <= 375 ? 12 : 14,
    fontWeight: '400',
    color: '#959595',
  },
   paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444444',
    marginBottom: 16,
  },
   subtitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1e1e1e',
    marginTop: 10,
    marginBottom: 8,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
   row: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowField: {
    fontSize:  15,
    fontWeight: '600',
    color: '#0e0e0e',
    width: windowWidth <= 375 ? 90 : 130,
  },
  rowValue: {
    fontSize: windowWidth <= 375 ? 13 : 15,
    fontWeight: '500',
    color: '#171717', //windowWidth > 365 && 10 || 15
  },
  rowValueDate: {
    fontSize: windowWidth > 365 && 10 || 15,
    fontWeight: '500',
    color: '#171717', //windowWidth > 365 && 10 || 15
  },
  rowList: {
    flexDirection: 'column',
  },
  rowUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowUserText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#171717',
    marginLeft: 6,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
 //   backgroundColor: '#ffa500',
    backgroundColor: colors.orange,
  },
  badgeText: {
    fontSize: Platform.OS == "ios" ? windowWidth * 0.025 : 10,
    fontWeight: '600',
    color: '#fff',
  },
   title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#1e1e1e',
    marginTop: 12,
    marginBottom: 10,
  },
  // Header
  actionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  actionFilled: {
    backgroundColor: '#e8f0f9',
    borderRadius: 9999,
  },
  action: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
    paddingHorizontal: 16,
  },
 
});

// 2ieme
// import React from 'react';
// import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
// import FeatherIcon from 'react-native-vector-icons/Feather';

// export default function DetailsNotification({navigation}) {
//   const [form, setForm] = React.useState({
//     side: '',
//     temperature: '',
//   });

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
//       <View style={styles.actionContainer}>
//         <SafeAreaView>
//           <View style={styles.actionWrapper}>
//             <TouchableOpacity
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={{ marginRight: 'auto' }}>
//               <View style={[styles.action, styles.actionFilled]}>
//                 <FeatherIcon color="#000" name="chevron-left" size={22} />
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => {
//                 // handle onPress
//               }}>
//               <View style={styles.action}>
//                 <FeatherIcon color="#fff" name="heart" size={22} />
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => {
//                 // handle onPress
//               }}>
//               <View style={styles.action}>
//                 <FeatherIcon color="#fff" name="share" size={22} />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </View>
         
//      <ScrollView style={{ marginBottom: 50 }}>
//      <Image
//           alt=""
//           source={{
//             uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
//           }}
//           style={styles.heroImg}
//         />   
//       <View style={styles.section}>
//         <View style={styles.sectionBody}>
//           <Text style={styles.title}>Old Time Burger</Text>

//           <Text style={styles.subtitle}>Comes with BBQ sause, pickles, tomatoes, and onions. Served medium rare.</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <View>
//             <Text style={styles.sectionTitle}>Side</Text>

//             <Text style={styles.sectionSubtitle}>Select one option</Text>
//           </View>

//           <View style={styles.sectionBadge}>
//             <Text style={styles.sectionBadgeText}>Required</Text>
//           </View>
//         </View>

//         <View style={styles.sectionOptions}>
//           {[
//             { label: 'Fries', price: null },
//             { label: 'Onion Rings', price: 1.95 },
//             { label: 'Cole Slaw', price: null },
//             { label: 'Sweet Potato Fries', price: 2.95 },
//             { label: 'Side Salad', price: null },
//           ].map(({ label, price }, index) => {
//             const isActive = form.side === label;
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setForm({ ...form, side: label });
//                 }}>
//                 <View style={[styles.radio, index === 0 && { borderTopWidth: 0 }]}>
//                   <View style={[styles.radioInput, isActive && styles.radioInputActive]} />

//                   <Text style={styles.radioLabel}>{label}</Text>

//                   {price && (
//                     <Text style={styles.radioPrice}>
//                       +$
//                       {price}
//                     </Text>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>

//       <View style={styles.section}>
//         <View style={styles.sectionHeader}>
//           <View>
//             <Text style={styles.sectionTitle}>Meat Temperature</Text>

//             <Text style={styles.sectionSubtitle}>Select one option</Text>
//           </View>

//           <View style={styles.sectionBadge}>
//             <Text style={styles.sectionBadgeText}>Required</Text>
//           </View>
//         </View>

//         <View style={styles.sectionOptions}>
//           {['Well Done', 'Medium Well', 'Medium', 'Medium Rare', 'Rare'].map((label, index) => {
//             const isActive = form.temperature === label;
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   setForm({ ...form, temperature: label });
//                 }}>
//                 <View style={[styles.radio, index === 0 && { borderTopWidth: 0 }]}>
//                   <View style={[styles.radioInput, isActive && styles.radioInputActive]} />

//                   <Text style={styles.radioLabel}>{label}</Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//      </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: 12,
//     paddingHorizontal: 16,
//     paddingBottom: 48,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   heroImg: {
//     width: '100%',
//     height: 250,
//   },
//   title: {
//     fontSize: 27,
//     fontWeight: '700',
//     color: '#1d1d1d',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#494949',
//   },
//   section: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e7e7e7',
//     marginBottom: 12,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   sectionBadge: {
//     backgroundColor: '#e7e7e7',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sectionBadgeText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1d1d1d',
//   },
//   sectionOptions: {
//     paddingTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#1d1d1d',
//     marginBottom: 4,
//   },
//   sectionSubtitle: {
//     fontSize: 13,
//     color: '#6d6d6d',
//   },
//   actionContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   actionFilled: {
//     backgroundColor: '#e8f0f9',
//     borderRadius: 9999,
//   },
//   radio: {
//     position: 'relative',
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderTopWidth: 1,
//     borderColor: '#e7e7e7',
//   },
//   radioLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#2d2d3a',
//   },
//   radioInput: {
//     width: 18,
//     height: 18,
//     borderRadius: 9999,
//     borderWidth: 2,
//     borderColor: '#1d1d1d',
//     marginRight: 12,
//   },
//   radioInputActive: {
//     borderWidth: 5,
//     borderColor: '#1d1d1d',
//   },
//   btnText: {
//     fontSize: 16,
//     lineHeight: 26,
//     fontWeight: 'bold',
//     color: '#fff',
//     letterSpacing: 0.45,
//   },
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     backgroundColor: '#FF6738',
//     borderColor: '#FF6738',
//   },
//   action: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     marginHorizontal: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   actionWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginHorizontal: -8,
//     paddingHorizontal: 16,
//   },
//   radioPrice: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6d6d6d',
//     marginLeft: 'auto',
//   },
// });