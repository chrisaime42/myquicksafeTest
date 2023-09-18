import React, {useEffect, useRef, useState} from 'react'
import { Text, StyleSheet, View} from 'react-native'
import {colors} from "../styles";

const LoadingScreen = () => {
    const [load, setLoad] = useState(false)
    const isMounted = useRef(true);

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            if( isMounted.current){
                setLoad(false)
            }
        }, 5000)
            return (() => {
                isMounted.current = false;
            })
    }, [])
    return (
        <View style={styles.container}>
          <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
             <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                 <Text style={{ borderWidth: 1, borderRightWidth: 15, borderColor: colors.pink, padding: 2, textTransform: "uppercase", color: colors.pink, margin: 0, fontSize: 40, fontFamily: "Oswald-ExtraLight" }} > Quick safe</Text>
             </View>
              <View style={{ flex: 1, justifyContent: "flex-end"}}>
                  <Text style={{ textTransform: "uppercase", color: colors.grey, lineHeight: 65, fontSize: 10, fontFamily: "Oswald-Bold" }} >credit &copy; 2021 v1.0.1</Text>
              </View>
          </View>
        </View>
    );
}

export default LoadingScreen


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.dark,
    }
})
      