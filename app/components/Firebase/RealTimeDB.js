import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

class RealTimeDB {
  StoreUserCollection(userData) {
    const user = firebase.auth().currentUser;
    console.log('rt');
    if (user != null) {
      console.log('DB:', user);
      database()
        .ref('/users/' + user.uid + '/profile')
        .set({
          displayName: userData.displayName,
          email: userData.email,
          phoneNumber: userData.phonenumber,
          address: userData.address,
          photoURL: '',
        })
        .then(() => console.log('Data set.'));
    }
  }
}
const RealTimeDB1 = new RealTimeDB();
export default RealTimeDB1;
