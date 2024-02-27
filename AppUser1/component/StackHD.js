import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Detail from './screens/Detail';
const Stack = createNativeStackNavigator();
const StackHD = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='Detail' component={Detail} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default StackHD;
