import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ahome from './instack/Ahome';
import Detail from './instack/Detail';
import Search from './instack/Search';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={Ahome} options={{headerShown: false}}/>
        <Stack.Screen name = 'detail' component={Detail} options={{title:'กลับ'}}/>
        <Stack.Screen name = 'search' component={Search} options={{title:'กลับ'}}/>
        
    </Stack.Navigator>
   
  )
}
const a = StyleSheet.create({
  text:{
    textAlign:'center'
    ,fontSize:200
  }
  ,position:{
    justifyContent:'center',
    
  }
})
export default HomeStack