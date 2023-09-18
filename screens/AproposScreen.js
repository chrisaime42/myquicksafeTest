import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import {colors, gs} from '../styles'



const AproposScreen = ({navigation}) => {
    return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ padding: 10, width: "100%", backgroundColor: colors.pink, height: 200, paddingBottom: 30 }}>
               
                    <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 30, marginHorizontal: 10 }}>
                        <Text style={[gs.subTitle, { fontFamily: 'Oswald-ExtraLight'}]}> APROPOS</Text>
                  
                    </View>
                    <TouchableOpacity>
                        <View></View>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                
                <Avatar.Image  source={require('../assets/icon.png')}
            style={{ height: 180, width: 180,  borderRadius: 100, marginTop: -90,
                backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center"}} />
                <Text style={{ fontSize: 25, padding: 10,
                    textTransform: 'uppercase', fontFamily: 'Oswald-Bold' }}>Quick Safe</Text>
                <Text style={{ fontSize: 15, color: "gray", fontFamily: 'Oswald-ExtraLight' }}>version 1.0.1</Text>
                <Text style={{ fontSize: 15, color: "gray", fontFamily: 'Oswald-Bold' }}>28 mars 2021 </Text>
                
                <TouchableOpacity style={{
                    backgroundColor: colors.pink,
                    padding: 20,
                    marginTop: 10,
                    alignItems: 'center', justifyContent: "center", flex: 1, alignContent: "center", position: "relative"
                }} >
                    <Text style={{ fontSize: 15, color: "#fff", fontFamily: 'Oswald-ExtraLight' }}> Mention Légal</Text>
                </TouchableOpacity>
                </View>
                
            </ScrollView>
    )
}

export default AproposScreen
