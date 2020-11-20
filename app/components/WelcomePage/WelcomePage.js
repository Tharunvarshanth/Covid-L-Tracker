import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function WelcomePage({navigation}) {
  const gotopage = () => {
    navigation.push('signin');
  };

  useEffect(() => {
    console.log('adgf');
    setTimeout(function () {
      gotopage();
    }, 3000);
  });

  return (
    <View style={styles.body}>
      <Text style={[styles.wel1, styles.wel]}>Welcome To</Text>
      <Text style={[styles.wel2, styles.wel]}>Covid Location Tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgb(0, 255, 153)',
    flex: 1,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wel: {
    padding: 5,
    color: 'rgb(255, 80, 80)',
    fontWeight: 'bold',
  },
  wel1: {
    fontSize: 40,
  },
  wel2: {
    fontSize: 20,
  },
});

export default WelcomePage;
