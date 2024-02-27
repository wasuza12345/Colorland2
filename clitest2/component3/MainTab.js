import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stack from './Stack';
import Feather from 'react-native-vector-icons/Feather';

import Report from './Report';
import Profile from './Profile';
import StackCart from './StackCart';
const Tab = createBottomTabNavigator();
const MainTab = () => {
  return (
   <Tab.Navigator
   screenOptions={({route})=>({
    tabBarIcon:({focused,color,size})=>{
      let iconName
      let labelColor
      let rn=route.name
      if(rn==='home'){
        iconName = focused ? 'home':'home'
         color = focused ? '#750EF9' : color;
        labelColor = focused ? '#750EF9' : '#750EF9';
      }else if (rn === 'ตระกร้า'){
        iconName = focused ? 'shopping-cart':'shopping-cart'
        color = focused ? '#750EF9' : color;
        labelColor = focused ? '#750EF9' : '#750EF9';
      }else if( rn === 'รายงาน'){
        iconName = focused ? 'file-text':'file-text'
        color = focused ? '#750EF9' : color;
        labelColor = focused ? '#750EF9' : '#750EF9';
      }else if (rn === 'บัญชี'){
        iconName = focused ? 'user' : 'user'
        color = focused ? '#750EF9' : color;
        labelColor = focused ? '#750EF9' : '#750EF9';
      }
      return <Feather name={iconName} size={size} color={color} />;
    },
    tabBarShowLabel:false,
    tabBarStyle:{backgroundColor:'#fff',height:45 ,borderTopLeftRadius:40,borderTopRightRadius:40,position:'absolute'}
 
  }
  )} 
   >
    <Tab.Screen
    name = 'home'
    component={Stack}
    options={{headerShown:false}}/>
    <Tab.Screen
    name = 'ตระกร้า'
    component={StackCart}
    options={{headerShown:false}}/>
    <Tab.Screen
    name = 'รายงาน'
    component={Report}
    options={{headerShown:false}}/>
    <Tab.Screen
    name = 'บัญชี'
    component={Profile}
    options={{headerShown:false}}/>
   </Tab.Navigator>
  )
}

export default MainTab