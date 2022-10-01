import 'react-native-gesture-handler'
import * as React from 'react';
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './Store'
import './Translations'
import { LoginScreen } from './Screens/Login/Screen';
import { NavigationContainer } from '@react-navigation/native';
import * as LightColors from './Themes/Light/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as LightboxProviderInner, defaultValue } from './Services/Lightbox';
import Toast from 'react-native-toast-message';
import { State, useAuthState } from './Store/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DietDayView } from './Features/Diets/Screens/DayView/DietDayView';
import { Navigation } from './Navigation';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as SettingsProvider, Context } from './Services/AppSettings';
import { useContext, useEffect, useState } from 'react';
import { LightboxLocale } from '@mandl-tv/lightbox-client/dist/types';
const theme = createTheme({
  lightColors: {
    primary: '#669933'
  },
  darkColors: {
    primary: '#669933'
  }
});
type ProviderProps = {  
  children?:
      | React.ReactChild
      | React.ReactChild[];
}
const fromLocale = (locale:"en" | "pl") => {
  switch (locale) {
    case "pl":
      return LightboxLocale.Polish;
    default:
      return LightboxLocale.English;
  }
}
const LightboxProvider = ({children}:ProviderProps) => {
  const settings = useContext(Context);
  const [client, setClient] = useState(defaultValue({ locale: LightboxLocale.English }));
  useEffect(() => {
    setClient(defaultValue({ locale: fromLocale(settings.settings.locale) }))
  }, [settings])
  return <LightboxProviderInner value={client}>{children}</LightboxProviderInner>;
}
const App = () => {
  return (
    <>

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <SettingsProvider>

              <LightboxProvider>
              <ThemeProvider theme={theme}>
                <Navigation />
              </ThemeProvider>
              </LightboxProvider>
              </SettingsProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>

      <Toast />
    </>
  )
}

export default App
