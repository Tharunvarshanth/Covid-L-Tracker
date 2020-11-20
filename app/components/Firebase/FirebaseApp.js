import auth from '@react-native-firebase/auth';

class FirebaseApp {
  firesignin(userData, callback) {
    var isSignin = false;
    console.log(userData);
    auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        //console.log('Login OKAY');
        isSignin = true;
        callback(isSignin);
      })
      .catch((err) => {
        console.log('Login failure');
        isSignin = false;
        callback(isSignin);
      });
  }

  firesignup(userData, callback) {
    let isSignup;

    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((data) => {
        isSignup = true;
        console.log('Account created OKAY', data);
        callback(isSignup);
      })
      .catch((err) => {
        console.log('Sign Up failure', err);
        isSignup = false;
        callback(isSignup);
      });
  }

  firelogout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
}

const FireBaseApp = new FirebaseApp();
export default FireBaseApp;
