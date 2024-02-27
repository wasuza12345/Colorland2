import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReStatus1 from './ReStatus1';
import ReStatus3 from './ReStatus3';
import ReStatus2 from './ReStatus2';
import ReStatus4 from './ReStatus4';

const Tab = createMaterialTopTabNavigator();

const Report = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarIndicatorStyle: { backgroundColor: '#5bf355' },
      tabBarLabelStyle: { fontSize: 15 ,color:'#fff',fontFamily:'NotoSansThai-VariableFont_wdth,wght'},
      tabBarItemStyle: { height:70},
      tabBarStyle: { backgroundColor: '#44266A', },
     
      
    }}>
    <Tab.Screen name="รอดำเนินการ" component={ReStatus1} />
        <Tab.Screen name="กำลังดำเนินการ" component={ReStatus2} />
        <Tab.Screen name="สำเร็จ" component={ReStatus3} />
        <Tab.Screen name="ยกเลิกสินค้า" component={ReStatus4} />
   
  </Tab.Navigator>
  // <View></View>
  
    )
}

export default Report