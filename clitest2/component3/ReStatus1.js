import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReS1_1 from './ReS1_1';
import ReS1_2 from './ReS1_2';
const Stack1 = createNativeStackNavigator();
const ReStatus1 = () => {
  return (
    <Stack1.Navigator>
    <Stack1.Screen
      name="rs1.1"
      component={ReS1_1}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="rs1.2"
      component={ReS1_2}
      options={{headerShown: false}}
    />
    </Stack1.Navigator>
  )
}

export default ReStatus1