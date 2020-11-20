import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

class StoreDB {
  constructor() {}
  test(s) {
    console.log(s);
  }

  readlocation(callback) {
    const user = firebase.auth().currentUser;
    var dblocation = '';
    const d = new Date();
    const date = d.toDateString();
    database()
      .ref('/users/' + user.uid + '/location/' + date)
      .once('value')
      .then((snapshot) => {
        //console.log('User Location: ', snapshot.val());
        dblocation = snapshot.val();
        callback(dblocation);
      });
  }
  updateLocations(alllocation) {
    console.log('updateLocations', alllocation);

    const d = new Date();
    const date = d.toDateString();

    const user = firebase.auth().currentUser;

    if (user != null) {
      database()
        .ref('/users/' + user.uid + '/location/' + date)
        .set(alllocation)
        .then(() => console.log('Data set.'));
    }
  }

  FirstTimeSignup(homeaddress) {
    console.log('Registration Home Address:', homeaddress);

    const d = new Date();
    const date = d.toDateString();

    const user = firebase.auth().currentUser;

    if (user != null) {
      database()
        .ref('/users/' + user.uid + '/location/' + date)
        .set([
          {
            HomeAddress: homeaddress,
          },
        ])
        .then(() => console.log('Data set.'));
    }
  }

  time(info) {
    const d = new Date(info.timestamp);
    const date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
    return date;
  }
}

const storeDB = new StoreDB();
export default storeDB;
