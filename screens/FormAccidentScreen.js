import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image, Platform, ScrollView
} from 'react-native';
import {colors} from "../styles";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';


const users = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
];
const FormAccidentScreen = ({navigation}) => {
    
    const MonGuide = () => {
      return (
        <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerAction}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                  <FeatherIcon color="#0e0e0e" name="x" size={24} />
                </TouchableOpacity>
              </View>

              <Text style={styles.headerTitle}>Receipt</Text>

              <View style={[styles.headerAction, { alignItems: 'flex-end' }]} />
            </View>

            <ScrollView contentContainerStyle={styles.receipt} showsVerticalScrollIndicator={false}>
              <View style={styles.receiptLogo}>
                <FeatherIcon color="#fff" name="codepen" size={32} />
              </View>

              <Text style={styles.receiptTitle}>TechWorld Consulting Inc.</Text>

              <Text style={styles.receiptSubtitle}>Invoice #0012-2832</Text>

              <View style={styles.receiptPrice}>
                <Text style={styles.receiptPriceText}>$115,900</Text>

                <Text style={[styles.receiptPriceText, { fontSize: 20, lineHeight: 32 }]}>.00</Text>
              </View>

              <Text style={styles.receiptDescription}>Software Development March 2023 - April 2023</Text>

              <View style={styles.avatarWrapper}>
                {users.map(user => (
                  <Image
                    key={user}
                    alt=""
                    source={{
                      uri: user,
                    }}
                    style={[styles.avatar, { marginLeft: -(40 / 4) }]}
                  />
                ))}
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerInset} />
              </View>

              <View style={styles.details}>
                <Text style={styles.detailsTitle}>Transaction details</Text>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Date</Text>

                  <Text style={styles.detailsValue}>April 2, 2023</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Category</Text>

                  <Text style={styles.detailsValue}>Development</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Payment method</Text>

                  <Text style={styles.detailsValue}>Visa ending in 0182</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Receipt Number</Text>

                  <Text style={styles.detailsValue}>9876543210</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Billing Name</Text>

                  <Text style={styles.detailsValue}>John Smith</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Billing Email</Text>

                  <Text style={styles.detailsValue}>johnsmith@example.com</Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsField}>Billing Address</Text>

                  <Text style={styles.detailsValue}>1234 Elm Street, Suite 567, Anytown, USA</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit Receipt</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Save as PDF</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
      )
    }
    return (
        <TouchableOpacity style={{ zIndex : 3 }} onPress={() => MonGuide()}>
            <View style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 30,
                borderColor: colors.white,
                borderWidth: StyleSheet.hairlineWidth,
                borderTopRadius: 200,
                borderBottomRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3,
                marginTop: -50
                //marginBottom: Platform.OS == "android" ? 50 : 30
            }}>
                <Image
                    source={require('../assets/adaptive-icon.png')}
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: colors.darkBg,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default FormAccidentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textSec
  },
  input: {
    marginTop: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.pink,
    borderRadius: 5,
    paddingHorizontal: 16,
    color:colors.white,
    fontWeight: '600',
    padding: 10,
  },
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  receipt: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 140,
  },
  receiptLogo: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 12,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#151515',
    marginBottom: 2,
  },
  receiptSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#818181',
    marginBottom: 12,
  },
  receiptPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  receiptPriceText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: 'bold',
    letterSpacing: 0.35,
    color: '#8338ec',
  },
  receiptDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#818181',
    textAlign: 'center',
    marginBottom: 12,
  },
  details: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  detailsRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailsField: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#8c8c8c',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  detailsValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#444',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'right',
  },
  detailsActions: {
    marginTop: 24,
  },
  divider: {
    overflow: 'hidden',
    width: '100%',
    marginVertical: 24,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#8338ec',
    borderColor: '#8338ec',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#8338ec',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#8338ec',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  dividerInset: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    marginTop: -2,
  },
})