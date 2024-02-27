import { View, Text, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(value => {
        setToken(value);
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
      });
  }, []);

  const handle = () => {
    fetch('http://10.6.142.108:3000/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': token
      },
      body: JSON.stringify({
        name: name,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // handle success response
    })
    .catch(error => {
      console.error('Request error: ', error.message);
      // handle request error
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('AsyncStorage error:', error);
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}></TextInput>
      <Button title='entry' onPress={handle}></Button>
      <Button title='loguot' onPress={handleLogout}></Button>
      
    </View>
  );
};

export default Profile;