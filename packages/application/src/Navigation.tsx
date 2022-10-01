import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DietDayView } from './Features/Diets/Screens/DayView/DietDayView';
import { NavigationContainer } from '@react-navigation/native';
import { State, useAuthState } from "./Store/Login";
import { useSelector } from "react-redux";
import { LoginScreen } from "./Screens/Login/Screen";

import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const routeIcons:Record<string, string> = {
    "Diets": "albums-outline"
}
const toIcon = (routeName:string) => routeIcons[routeName] || 'ios-list';
export const Navigation = () => {
    const state = useSelector(useAuthState);
    return <NavigationContainer>
    { state.state === State.Authenticated ? 
      <Tab.Navigator screenOptions={{ 
          tabBarActiveBackgroundColor: "green",
          tabBarInactiveBackgroundColor: "white"
      }}>
        <Tab.Screen name="Diets" options={{ headerShown: false, tabBarIcon: ({ size, color }) => <Icon name="albums-outline" size={size} color={color} />}} component={DietDayView}/>
      </Tab.Navigator>
       : 
      <Stack.Navigator >
        <Stack.Screen name="Log in" options={{ headerShown: false}} component={LoginScreen} />
      </Stack.Navigator>
    }
    </NavigationContainer>;
}