import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { LightboxLogo } from "../../Constants";
import { AuthError, loginAction, State, useAuthState, useCredentials } from '../../Store/Login';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store';
import { Context } from '../../Services/Lightbox';
import { LoginForm } from './Components/LoginForm';
const { width, height } = Dimensions.get("screen");
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { withTheme } from '@rneui/themed';

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    elevation: 1,
    backgroundColor: '#ffffff',
    overflow: "hidden"
  },
  socialConnect: {
    padding: 10,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  socialButtons: {
    width: 120,
    height: 40,
    elevation: 1
  },
  socialTextButtons: {
    color: 'red',
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },

});

type RootStackParamList = {

   Pdp: undefined; //current screen

   PdpComments: {slug: string}; // a screen that we are 
// navigating to, in the current screen,
// that we should pass a prop named `slug` to it

   Sellers: {data: Array<string>};

   Favorites: undefined; // a screen that we are navigating to 
// in the current screen, that we don't pass any props to it
};

interface IPdpPageProps {
   navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
}

type LoginProps = {
  navigation: IPdpPageProps
}
const isErrorState = (r:unknown):r is AuthError => {
  if (!r || !(r as any).state) return false;
  return ((r as any).state as State) === State.Error;
}
export const LoginScreen = withTheme<LoginProps>(({ navigation }:LoginProps) => {
  const dispatch:AppDispatch = useDispatch();
  const credentials = useSelector(useCredentials);
  const authState = useSelector(useAuthState);
  const client = useContext(Context);
  useEffect(() => {
    console.log("Auth state", authState);
    if (isErrorState(authState)) {
      Toast.show({
          type: 'error',
          text1: t('auth.login.failed'),
          text2: authState.error
      });
    }
  }, [authState]);

  
  const logIn = ({ email, password }:{ email: string, password: string }) => {
    const action = loginAction({
      client,
      credentials: {
        email,
        password
      }
    });
    dispatch(action);
  };
  return (
    <View style={{flex: 1, justifyContent: "center", backgroundColor: '#000000'}}>
      <StatusBar hidden />
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, alignContent: "center"}}>
          <View style={styles.registerContainer}>
            <View style={[{ flex: 0.25, alignItems: "center", alignContent: "center" }, styles.socialConnect]}>
              <Image style={{ aspectRatio: 0.8, resizeMode: 'contain', backgroundColor: "white", borderRadius: 0, }} source={LightboxLogo} />
              <View style={{flex: 1, alignContent: "center", borderRadius: 0}}>
                <LoginForm 
                  editable={authState.state != State.Authenticating}
                  email={credentials?.email || ''}
                  password={credentials?.password || ''}
                  logIn={logIn}
                  screenWidth={width}
                />
              </View>
            </View>
          </View>
        </View>
    </View>
  );
});

type LoginFormProps = {
  email: string,
  password: string,
  logIn: () => void,
  screenWidth: number,
}