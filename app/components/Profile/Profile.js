import React, {Component, useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {utils} from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../../App';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Styles} from './ProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import * as Alert from 'react-native';
import Tracker from '../Tracker/Tracker';
import CreateAlert from '../CreateAlert';

const Separator = () => <View style={Styles.separator} />;

function Profile() {
  const [userState, setuserState] = React.useState();
  const [profileimg, setprofileimg] = React.useState(
    'https://firebasestorage.googleapis.com/v0/b/covid-l-tracker.appspot.com/o/covidltrackerdefault.png?alt=media&token=3fc9132a-12da-426d-84c2-50f2b9f960e5',
  );
  const {signOut} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    database()
      .ref('/users/' + user.uid + '/profile')
      .once('value')
      .then((snapshot) => {
        //  console.log('User data: ', snapshot.val());
        setuserState(snapshot.val());

        if (snapshot.val().photoURL != '') {
          imgurl(snapshot.val().photoURL);
        }
      });
  }, [image]);

  const imgurl = async (i) => {
    const imagesrc = await storage().ref(i).getDownloadURL();
    setImage(imagesrc);
  };

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('source', source);

        uploadImage(source);
      }
    });
  };

  const uploadImage = async (s) => {
    const {uri} = s;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    const user = firebase.auth().currentUser;
    const reference = storage().ref('/' + user.uid + '/' + filename);
    const pathToFile = s.uri;
    setImage('/' + user.uid + '/' + filename);
    // uploads file
    await reference.putFile(pathToFile);
    database()
      .ref('/users/' + user.uid + '/profile')
      .update({
        photoURL: '/' + user.uid + '/' + filename,
      })
      .then(() => CreateAlert('Photo Uploaded'));
  };

  if (userState != null) {
    return (
      <ScrollView style={Styles.container}>
        <Tracker />
        <Text style={Styles.headertext}>Hi </Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={selectImage}>
            <FontAwesome name="edit" color="#00001a" size={20} />

            {image != '' ? (
              <Image
                source={{
                  uri: image,
                }}
                style={Styles.image}
              />
            ) : (
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/covid-l-tracker.appspot.com/o/covidltrackerdefault.png?alt=media&token=3fc9132a-12da-426d-84c2-50f2b9f960e5',
                }}
                style={Styles.image}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={Styles.footer}>
          <Text style={Styles.text}>{userState.displayName}</Text>
          <Text style={Styles.text}>{userState.phoneNumber}</Text>
          <Text style={Styles.text} />

          <View style={Styles.buttons}>
            <Separator />
            <Button style={Styles.buttonloc} title="View Locations" />
            <Button
              style={Styles.buttonout}
              title="signout"
              onPress={() => signOut('userToken')}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text style={Styles.loading}>Loading</Text>
      </View>
    );
  }
}

export default Profile;
