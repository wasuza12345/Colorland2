import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Register = ({navigation}) => {
  const [name1, setname] = useState('');
  const [address, setAddress] = useState('');
  const [email1, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const handleregister = () => {
    if(email1==''){
        Alert.alert('no success',navigation.goBack())
        return
    }
    fetch('http://192.168.1.204:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name1,
        address: address,
        email: email1,
        password: password1,
      }),
    });
    Alert.alert('success');
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F5F5'}}>
        
      <View style={a.box1}>
        
        <View
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            backgroundColor: '#8C33FF',
            borderRadius: 100,
            bottom: 250,
            left: 10,
          }}></View>
        <View
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            backgroundColor: '#8C33FF',
            borderRadius: 100,
            bottom: 250,
            right: 10,
          }}></View>
        <View
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            backgroundColor: '#A259FF',
            borderRadius: 100,
          }}></View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
            color: '#fff',
          }}>
          สมัครสมาชิก
        </Text>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#44266A'}}>
          COLOURLAND
        </Text>
        <View style={a.box2}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#fff',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="adduser" size={35} color="#2D0C57"></AntDesign>
          </View>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 180,
              marginBottom: 5,

              marginTop: 10,
              fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
            }}>
            ชื่อ
          </Text>
          <TextInput
            placeholder="ชื่อ"
            value={name1}
            onChangeText={setname}
            style={{
              backgroundColor: '#fff',
              color: '#9F9F9F',
              borderRadius: 20,
              width: 400,
              borderWidth: 1,
              borderColor: '#CDD1E0',
              height: 60,
              fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
            }}></TextInput>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 175,
              marginBottom: 5,
              fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
              marginTop: 10,
            }}>
            ที่อยู่
          </Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={{
              backgroundColor: '#fff',
              color: '#9F9F9F',
              borderRadius: 20,
              width: 400,
              borderWidth: 1,
              borderColor: '#CDD1E0',
              height: 60,
              fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
            }}
            placeholder="ที่อยู่"></TextInput>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 170,
              marginBottom: 5,

              marginTop: 10,
            }}>
            Email
          </Text>
          <TextInput
            placeholder="Email"
            value={email1}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: '#fff',
              color: '#9F9F9F',
              borderRadius: 20,
              width: 400,
              borderWidth: 1,
              borderColor: '#CDD1E0',
              height: 60,
            }}></TextInput>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 149,
              marginTop: 10,
              marginBottom: 5,
            }}>
            Password
          </Text>
          <TextInput
            value={password1}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            style={{
              backgroundColor: '#fff',
              color: '#9F9F9F',
              borderRadius: 20,
              width: 400,
              borderWidth: 1,
              borderColor: '#CDD1E0',
              height: 60,
            }}></TextInput>

          <TouchableOpacity
            style={{
              width: 400,
              height: 60,
              backgroundColor: '#0BCE83',
              marginTop: 40,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleregister}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#fff',
              }}>
              สมัครสมาชิก
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{position:'absolute',top: 15,left:10,}} onPress={()=>navigation.goBack()}><AntDesign name='left' size={22} color='#fff' ></AntDesign></TouchableOpacity>
    </View>
  );
};
const a = StyleSheet.create({
  box1: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#7519EB',
  },
  box2: {
    backgroundColor: '#F6F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    borderRadius: 40,
  },
});

export default Register;
