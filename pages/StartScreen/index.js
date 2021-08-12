import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../../assets/favicon.png'

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{width: '50%', height: '50%', resizeMode: 'center'}}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
