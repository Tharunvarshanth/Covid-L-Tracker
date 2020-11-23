import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import SignIn from './app/components/LoginPages/SignIn';

import Register from './app/components/LoginPages/Register';
import Profile from './app/components/Profile/Profile';
import {initialState, reducer} from './app/components/AsyncStorage/UserReducer';
import {
  fetchsignin,
  fetchsignout,
  fetchusertoken,
} from './app/components/AsyncStorage/UserActions';

import FireBaseApp, {
  firelogout,
  fire_signin,
} from './app/components/Firebase/FirebaseApp';
import CreateAlert from './app/components/CreateAlert';
import firebase from '@react-native-firebase/app';

export const AuthContext = React.createContext();
const Stack = createStackNavigator();

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let user;
      let isfirebaseloggedsuccessful = true;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userToken = JSON.parse(userToken);
        // console.log('App:userToken', userToken);
        if (userToken != null) {
          //isfirebaseloggedsuccessful = fire_signin(userToken);
          isfirebaseloggedsuccessful = fire_signin(userToken);
          user = await firebase.auth().currentUser;

          setTimeout(function () {
            if (user == null) {
              CreateAlert('Problem With your Account');
              userToken = null;
            }
          }, 7000);
        }
        //  console.log(userToken);
      } catch (e) {
        console.log('Restore Token Failed');
      }

      dispatch(fetchusertoken(userToken));
    };

    const interval = setTimeout(() => {
      SplashScreen.hide();
      bootstrapAsync();
      console.log('Flash Screen Hide');
    }, 3000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem('userToken', JSON.stringify(data));
          } catch (error) {
            console.log('Error Saving Data');
          }
        };

        _storeData();
        dispatch(fetchsignin(data));
      },
      signOut: async (key) => {
        const _removeData = async (key) => {
          try {
            await AsyncStorage.removeItem(key);
            firelogout();
          } catch (error) {
            console.log('Error Saving Data');
          }
        };
        _removeData(key);
        FireBaseApp.firelogout();
        dispatch(fetchsignout());
      },
      signUp: async (data) => {
        console.log('Sign Up', data);

        const _signupstoreData = async (data) => {
          try {
            console.log('Sign Up Async');
            await AsyncStorage.setItem('userToken', JSON.stringify(data));
          } catch (error) {
            console.log('Error Saving Data');
          }
        };
        _signupstoreData(data);
        dispatch(fetchsignin(data));
        //dispatch({type: 'SIGN_IN', token: 'dummy_token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken === null ? (
          <Stack.Navigator initialComponent={SignIn}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={Register} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
