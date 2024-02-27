import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';


import Profile1_2 from './Profile1_2';
import Favorites from './Favorites';
import Address from './Address';
import EditProfile from './EditProfile';
import AddressEdit from './AddressEdit';
const Stack1 = createNativeStackNavigator();
const Profile = () => {
  return (
    <Stack1.Navigator>
    <Stack1.Screen
      name="login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="register"
      component={Register}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="profile2"
      component={Profile1_2}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="Favorites"
      component={Favorites}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="Address"
      component={Address}
      options={{headerShown: false}}
    />
    <Stack1.Screen
      name="EditProfile"
      component={EditProfile}
      options={{title:'profile'}}
    />
    <Stack1.Screen
      name="addedit"
      component={AddressEdit}
      options={{headerShown: false}}
    />
    </Stack1.Navigator>
  )
}

export default Profile