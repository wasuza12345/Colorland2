import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from './Cart';
const Stack = createNativeStackNavigator();
const StackCart = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='cart' component={Cart} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default StackCart