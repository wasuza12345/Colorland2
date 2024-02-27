import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './instack/Login';
import Profile from './instack/Profile';
const Stack = createNativeStackNavigator();
const Setting = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name = 'Login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name = 'Profile' component={Profile} options={{title:'back'}}/>
    </Stack.Navigator>
  )
}

export default Setting