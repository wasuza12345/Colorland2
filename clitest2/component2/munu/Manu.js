import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './stack/HomeStack';
import Cart from './stack/Cart';
import Res from './stack/Res';
import Setting from './stack/Setting';
import Feather from 'react-native-vector-icons/Feather';



const Tab = createBottomTabNavigator();
const Manu = () => {
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
          tabBarStyle:{backgroundColor:'#fff',position:'absolute',height:60 ,borderTopLeftRadius:40,borderTopRightRadius:40}
       
        }
        )} 
      >
        <Tab.Screen name="home" component={HomeStack} options={{headerShown:false}}/>
        <Tab.Screen name = 'ตระกร้า' component={Cart} options={{headerShown:false}}/>
        <Tab.Screen name = 'รายงาน' component={Res} options={{headerShown:false}}/>
        <Tab.Screen name = 'บัญชี' component={Setting} options={{headerShown:false}}/>
      
      </Tab.Navigator>
    
    // <Text>fsdfsdf</Text>
  )
}
const a=StyleSheet.create({
  bar:{
    backgroundColor:'#000',
    borderRadius: 100,
  }
})

export default Manu