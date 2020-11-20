/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import CheckBox from '@react-native-community/checkbox';


import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
    Alert,
  ScrollView,
    ActivityIndicator,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../../App';
import CreateAlert from '../CreateAlert';
import FireBaseApp, {firesignin} from '../Firebase/FirebaseApp';
import RealTimeDB1, {StoreUserCollection} from '../Firebase/RealTimeDB';
import firebase from '@react-native-firebase/app';
import UpdatePro from '../Firebase/UpdateProfile';



export default function SignIn({navigation}) {
  const [userData, SetuserData] = React.useState({
    email: '',
    phonenumber: '',
    password: '',
    checkinput_emailchange: false,
    checkinput_phonechange: false,
    securetextentry: true,
    showLoader:false,
  });

 const showLoader = () => { SetuserData({...userData, showLoader:true }); };
 const  hideLoader = () => { SetuserData({...userData, showLoader:false }); };



  const {signIn} = React.useContext(AuthContext);


  const setemailchange = (val) => {
    if (val.trim().length !== 0) {
      SetuserData({
        ...userData,
        email: val.trim(),
        checkinput_emailchange: true,
      });
    } else {
      SetuserData({
        ...userData,
        email:'',
        checkinput_emailchange: false,
      });
    }
  };
  const setpasswordchange = (val) => {
    if (val.trim().length !== 0) {
      SetuserData({
        ...userData,
        password: val.trim(),
        checkinput_emailchange: true,
      });

    } else {
      SetuserData({
        ...userData,
        password:'',
        checkinput_emailchange: false,
      });
    }
  };

  function setphonechange(val) {
    if (((val).trim()).length !== 0) {
      SetuserData({
        ...userData,
        phonenumber: val.trim(),
        checkinput_phonechange: true,
      });
      console.log(userData.phonenumber);
    } else {
      SetuserData({
        ...userData,
        phonenumber:'',
        checkinput_phonechange: false,
      });
    }
  }
  function updateSecuretextentry() {
    SetuserData({
      ...userData,
      securetextentry: !userData.securetextentry,
    });
  }

  function handleSignin() {
    console.log(userData);
    showLoader();

      if (userData.email != '' && userData.password != '') {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(userData.email)) {
          CreateAlert('Email Validation Error');
      } else {

          FireBaseApp.firesignin(userData,function(isSignin) {
             hideLoader();
            if (isSignin) {

                CreateAlert('Sign In Okay');
                signIn(userData);


            } else {
              CreateAlert('Sign In Failure');
            }
          });

        }
      } else {
        CreateAlert('Fill the form');

      }
    }






  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.text_header}> Welcome To Login Page</Text>
      </View>
      <View style={styles.footer}>

        <Text>Do you like to login with email</Text>
        <Text style={styles.text_footer}>Email </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#00001a" size={20} />
          <TextInput
            style={styles.textInput}
            name="email"
            value={userData.email}
            placeholder="Your Email"
            autoCapitalize="none"
            onChangeText={(val) => setemailchange(val)}
          />
          {userData.checkinput_emailchange ?
              <Animatable.View
                 animation="bounceIn">
            <Feather name="user-check" color="green" size={20} />
            </Animatable.View>
           : null}
        </View>

        <Text style={[styles.text_footer, {marginTop: 15}]}>Password </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#00001a" size={20} />
          <TextInput
            style={styles.textInput}
            secureTextEntry={userData.securetextentry ? true : false}
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            onChangeText ={(val) =>setpasswordchange(val)}
          />
          <TouchableOpacity onPress={updateSecuretextentry}>
            {userData.securetextentry ?
                <Feather name="eye-off" color="grey" size={20}/>
            : <Feather name="eye" color="grey" size={20}/>}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <LinearGradient
            colors={['#00b300','#00cc00']}
           style={styles.signIn}>
         <TouchableOpacity onPress={ handleSignin}>
            <Text color="#004d00"  style={[styles.textSign, {color: '#fff'}]}>
              Sign In
            </Text>
         </TouchableOpacity>
          </LinearGradient>
        </View>
        <View>
        <Text>New user  </Text>
         <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
           <Text style={styles.textsignup}>click here for Registration</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ position: 'absolute', top:'50%',right: 0, left: 0 }}>
        <ActivityIndicator animating={userData.showLoader} size="large" color="red" />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b300',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  text_footer: {
    color: '#000000',
    fontSize: 20,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 20,
    color: '#ff0000',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textsignup: {
    color: '#cc0000',
  },
});
