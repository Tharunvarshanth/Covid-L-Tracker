import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

class UpdateProfile {
  AddProfile(userData) {
    const user = firebase.auth().currentUser;
    console.log('UpdateProfile', userData);
    if (user != null) {
      user
        .updateProfile({
          displayName: userData.displayName,
          phoneNumber: userData.phonenumber,
          photoURL: '',
        })
        .then(function () {
          console.log('Update successful', user);
        })
        .catch(function (error) {});
    }
  }
}
const UpdatePro = new UpdateProfile();
export default UpdatePro;
