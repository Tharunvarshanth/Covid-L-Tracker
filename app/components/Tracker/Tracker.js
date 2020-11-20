import Geolocation from '@react-native-community/geolocation';

import {
  View,
  Text,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  AsyncStorage,
} from 'react-native';
import React, {Component} from 'react';
import storeDB from './StoreDB';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
/*
BackgroundTask.define(async () => {
  console.log('BG Yask');

  // Remember to call finish()
  BackgroundTask.finish();
});
*/
class Tracker extends Component {
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
    Geolocation.setRNConfiguration(true);
  }
  watchID: ?number = null;

  componentDidMount() {
    //Back Button
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    const requestlocationpermission = async () => {
      if (Platform.OS === 'ios') {
        this.getOneTimeLocation();
        this.subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
          } else {
            console.log('Permission Denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    requestlocationpermission();

    /*Background
   BackgroundTask.schedule({
     period: 1800, // Aim to run every 30 mins - more conservative on battery
   });

   // Optional: Check if the device is blocking background tasks or not
   this.checkStatus();
   //Backgoriund*/
  }

  /*  async checkStatus() {
    const status = await BackgroundTask.statusAsync();

    if (status.available) {
      // Everything's fine
      return;
    }*

    const reason = status.unavailableReason;
    if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
      Alert.alert(
        'Denied',
        'Please enable background "Background App Refresh" for this app',
      );
    } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
      Alert.alert(
        'Restricted',
        'Background tasks are restricted on your device',
      );
    }*/

  subscribeLocationLocation() {
    this.watchID = Geolocation.watchPosition(
      (position) => {
        this.setState({
          lastPosition: position,
        });
        //   console.log('Current postion:', this.state.lastPosition);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 100,
      },
    );
  }

  getOneTimeLocation() {
    Geolocation.getCurrentPosition(
      (info) => {
        this.setState({
          initialPosition: info,
          lastPosition: info,
        });

        //  console.log('info', info);
      },
      (error) => alert(error.message),
    );
  }

  componentDidUpdate() {
    var Receivedblocation;
    Receivedblocation = this.state.lastPosition;

    storeDB.readlocation(function (dblocation) {
      if (dblocation != null) {
        // Receivedblocation.push(dblocation);
        dblocation.push(Receivedblocation);
        console.log('dblocation', JSON.stringify(dblocation));
        storeDB.updateLocations(dblocation);
      } else {
        console.log('else dblocation', dblocation);
      }
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    console.log('Unmount');
  }

  render() {
    return (
      <View>
        <Text />
      </View>
    );
  }
}

export default Tracker;
