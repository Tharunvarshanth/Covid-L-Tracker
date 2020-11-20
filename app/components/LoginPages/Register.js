/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {useState,useContext,useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView,

    TextInput, ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CreateAlert from '../CreateAlert';
import {AuthContext} from '../../../App';
import FireBaseApp from '../Firebase/FirebaseApp';
import RealTimeDB1 from '../Firebase/RealTimeDB';
import UpdatePro  from '../Firebase/UpdateProfile';
import firebase from '@react-native-firebase/app';
import {initialState, reducer} from '../AsyncStorage/UserReducer';
import storeDB from '../Tracker/StoreDB';



export default function Register({navigation}) {
    const [userData, SetuserData] = useState({
        email: '',
        phonenumber: '',
        password: '',
        displayName: '',
        address:'',
        checkinput_emailchange: false,
        checkinput_phonechange: false,
        securetextentry: true,
        showLoader:false,
    });
    const {signIn,signUp} = useContext(AuthContext);

    const showLoader = () => { SetuserData({...userData, showLoader:true }); };
    const  hideLoader = () => { SetuserData({...userData, showLoader:false }); };

    const setemailchange = (val) => {
        if (((val).trim()).length !== 0) {
            SetuserData({
                ...userData,
                email: val,
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

    const setdisplayname = (val)=>{
        if (((val).trim()).length !== 0) {
            SetuserData({
                ...userData,
                displayName: val,
            });
        }
    };

    const setpasswordchange = (val) => {
        if (((val).trim()).length !== 0) {
            SetuserData({
                ...userData,
                password: val,
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

    const setAddresschange = (val)=>{
         if ((val).trim().length !== 0){
             SetuserData({
                 ...userData,
                 address:val,
             });
         }
    };

    function setphonechange(val) {
        if (((val).trim()).length !== 0) {
            SetuserData({
                ...userData,
                phonenumber: val,
                checkinput_phonechange: true,
            });
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

 async function handlesignup(){
           showLoader();

            if (userData.email != '' && userData.password != '' && userData.phonenumber != '' && userData.address != '') {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

                if (!pattern.test(userData.email)) {
                    CreateAlert('Email Validation Error');
                } else {

                    FireBaseApp.firesignup(userData,function(returndata){
                        hideLoader();
                        console.log(returndata);
                    if (returndata == true){

           //     setTimeout(function aftersixSeconds() {

                     //   const user = firebase.auth().currentUser;
                     //   console.log(user);
                     //   if (user != null){
                            CreateAlert('Account  Created');
                            RealTimeDB1.StoreUserCollection(userData);
                            storeDB.FirstTimeSignup(userData.address);
                             UpdatePro.AddProfile(userData);
                              signUp(userData);
                      //  }
                     //   else {
                           // CreateAlert('Account NOT Created');
                    //    }


                    //    console.log(fire_initialState.msg);
                    //    console.log(fire_initialState.token);

                 //   }, 6000);
                    }
                    else {
                     CreateAlert('Account NOT Created');
                    }
});

                }
            }
            else {
                CreateAlert('Fill the form');
            }
        }


    return (
        <KeyboardAwareScrollView style={{backgroundColor:'#fff'}} >
          <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}> Welcome To Register Page </Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#00001a" size={20} />
                    <TextInput
                        style={styles.textInput}
                        name="email"
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
                <Text style={[styles.text_footer, {marginTop: 15}]}>Phone Number </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#00001a" size={20} />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.textInput}
                        name="Phonenumber"
                        placeholder="Your Mobile Number"
                        autoCapitalize="none"
                        onChangeText={(val) => setphonechange(val)}
                    />
                    {userData.checkinput_phonechange ?
                        <Animatable.View
                            animation="bounceIn">
                            <Feather name="phone" color="green" size={20}/>
                        </Animatable.View>
                        : null }
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
                <View>
                    <Text style={[styles.text_footer,{marginTop:15}]}>Display name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-plus" color="#00001a" size={20}/>
                        <TextInput
                          style={styles.textInput}
                          name="displayname"
                          placeholder="Name"
                          onChangeText={(val)=>setdisplayname(val)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.text_footer, {marginTop: 15}]}>Address </Text>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#00001a" size={20} />
                        <TextInput
                            style={styles.textInput}

                            name="address"
                            placeholder="Address"
                            autoCapitalize="none"
                            onChangeText ={(val) =>setAddresschange(val)}
                        />

                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signupbtn} onPress={handlesignup}>
                    <LinearGradient
                        colors={['#00b300','#00cc00']}
                        style={styles.signIn}>

                        <Text color="#004d00"  style={[styles.textSign, {color: '#fff'}]}>
                            Sign Up
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View>

                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Text style={styles.textsignup}>Go Back</Text>
                    </TouchableOpacity>

                </View>


            </View>
          </View>
            <View style={{ position: 'absolute', top:'50%',right: 0, left: 0 }}>
                <ActivityIndicator animating={userData.showLoader} size="large" color="red" />
            </View>
            </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#00b300',
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginTop:80,
        paddingBottom: 50,
    },
    footer: {
        flex: 5,
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
    textsignup:{
    color: '#cc0000',
    },
    signupbtn:{
        width: '100%' ,

    },
});
