import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';

import SearchFilter from './SearchFilter';
import Detail from './Detail';

const Stack1 = createNativeStackNavigator();
const Stack = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack1.Screen
        name="search"
        component={SearchFilter}
        options={{headerShown:false}}
      />
      <Stack1.Screen
        name="detail"
        component={Detail}
        options={{headerShown:false}}
      />
    </Stack1.Navigator>
  );
};

export default Stack;
