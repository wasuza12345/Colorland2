import {View, Text} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

//screens
import Cart from './screens/Cart';
import StackHD from './StackHD';

//screen names
const stackhd='Home'
const cartsName = 'Cart';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={stackhd}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let labelColor;
            let rn = route.name;
            if (rn === stackhd) {
              iconName = focused ? 'home' : 'home';
              // color = focused ? '#f00' : color;
              // labelColor = focused ? '#f00' : '#f00';
            } else if (rn === cartsName) {
              iconName = focused ? 'shoppingcart' : 'shoppingcart';
              // color = focused ? '#f00' : color;
              // labelColor = focused ? '#f00' : color;
            }
            return <AntDesign name={iconName} size={30} color={color} />
              
              
          },
        })}>
        <Tab.Screen
          name={stackhd}
          component={StackHD}
          options={{headerShown: false}}
        />
        <Tab.Screen name={cartsName} component={Cart} options={{headerShown:false}} />
        {/* <Tab.Screen name={detailsName} component={DetailScreen} />
        <Tab.Screen name={settingsName} component={SettingScreen} /> */}
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
