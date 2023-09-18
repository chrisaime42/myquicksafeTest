import React, {useContext, useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Share, ScrollView, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {colors} from "../styles";

import Header from "../components/Header";
import Stats from "../components/Stats";
import Location from "../components/Location";


const ProfileScreen = () => {
const [loader, setloader] = useState(false)
const [refreshing, setRefreshing] = useState(true);
 

//   if (loader) {
//       return <ActivityIndicator size='large' color={colors.pink} animating={true} style={{
//           flex: 1,
//           justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark
//       }}/>
//   }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false} style={styles.container}>
            <Header />
            <Stats />
            <Location />
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBg
    },
    userInfoSection: {
        marginTop: 30,
        paddingHorizontal: 30,
        marginBottom: 25,
        fontFamily: 'Oswald-Light',

    },
    userInfoSections: {
        marginTop: 30,
        paddingHorizontal: 30,
        marginBottom: 25,
        fontFamily: 'Oswald-Light',
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Oswald-ExtraLight'
    },
    caption: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: '500',
        fontFamily: 'Oswald-Medium',
       // textTransform: 'Capitalize'

    },
    row: {
        marginBottom: 10,
        fontFamily: 'Oswald-Light',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'center'

    },
    textUser: {
        color:"#777777",
        marginLeft: 20,
        fontFamily: 'Oswald-Light'

    },
    textLabel: {
        color:"#777777",
        marginLeft: 20,
        fontFamily: 'Oswald-Medium',
        textTransform: 'uppercase',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBoxWrappers: {
        height: 30,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Oswald-ExtraLight'
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        fontFamily: 'Oswald-Light'
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Oswald-Light'
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
});