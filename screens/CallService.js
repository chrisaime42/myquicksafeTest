import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Linking from "expo-linking";
import { colors } from '../styles';
import { windowWidth } from '../utils/Dimentions';

const items = [
  {
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Assistance routiere (SOTAR)',
    phone: '22366531',
  },
  {
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Sapeurs pompiers',
    phone: '118',
  },
  {
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Pharmacie de garde',
    phone: '1242',
  },
];


const CallServiceScreen = ({navigation}) => {

  return (
    <SafeAreaView style={{ backgroundColor: colors.dark, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 20 }}>
      <TouchableOpacity style={{ top: -5,left: -15, backgroundColor: colors.grayBg, padding : 5, borderRadius: 30, alignSelf: "center" }} onPress={() => navigation.goBack()}>
        <FeatherIcon color="#fff" name="arrow-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Centre d'appel</Text>
      <Text style={styles.title}></Text>
      </View>
       
        {items.map(({ name, phone }, index) => {
          return (
            <View
              key={index}
              style={[styles.card, index === 0 && { borderTopWidth: 0 }]}>
              {/* <Image
                alt=""
                resizeMode="cover"
                source={{ uri: img }}
                style={styles.cardImg}
              /> */}

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{name}</Text>
                <View style={styles.cardEmail}>
                  <FeatherIcon color="#737987" name="smartphone" size={15} />
                  <Text style={styles.cardEmailText}>{phone}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>  Linking.openURL(`tel:${phone}`)}
                style={styles.cardAction}>
                <FeatherIcon color="#fff" name="phone-forwarded" size={24} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
export default CallServiceScreen;
const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: windowWidth <= 375 ? 20 : 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
    justifyContent: "center"
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: '#2f3336',
  },
  cardImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  cardBody: {
    marginRight: 'auto',
   // marginLeft: 12,
  },
  cardTitle: {
    fontSize: windowWidth <= 375 ? 13 : 18,
    fontWeight: '700',
    color: '#fff',
  },
  cardEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  cardEmailText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737987',
    marginLeft: 4,
    lineHeight: 20,
    marginBottom: 2,
  },
  cardAction: {
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});