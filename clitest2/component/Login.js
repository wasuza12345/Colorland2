import React, { useState } from 'react';
import { View, TextInput, Button, Alert, AsyncStorage } from 'react-native';

const LoginScreen = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://10.6.138.28:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.isLogin) {
        // จัดเก็บโทเค็น
        // AsyncStorage.setItem('userToken', data.token);
        console.log(data.token)
        // นำทางไปยังหน้าหลัก
      } else {
        Alert.alert('Error', 'Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
