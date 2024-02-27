import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import React,{useState,useEffect} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIdUser } from './IdUserProvider';

const Login = ({navigation}) => {
  const [email1, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const http1 = 'http://192.168.1.204:3000/api/'
  const [iduser,setiduser] = useState([])
  const {updateIdUser} = useIdUser()
  // const handleLogin = () => {
  //   if(email1 == '' || password1 == ''){
  //     Alert.alert('โปรดใส่รหัสผ่าน')
  //     return
  //   }
  //   fetch(http1+'login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email1,
  //       password: password1,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(async data => {
  //       if (data.status === 'ok') {
  //         try {
  //           await AsyncStorage.setItem('token', data.token);
  //           fetch(http1+'user/'+email1).then(res=>res.json()).then(res=>{const userids = res.map(data=> data.id_login);setiduser(userids)})
  //           console.log(JSON.stringify(iduser))
  //           updateIdUser(iduser)
  //           navigation.navigate('profile2',{email1:email1})
  //         } catch (error) {
  //           console.error('AsyncStorage error:', error);
  //         }
  //       } else {
  //         Alert.alert('Error', 'Login failed');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       Alert.alert('Error', 'An error occurred during login.');
  //     });
  // };
  const handleLogin = () => {
    // ตรวจสอบว่า email และ password ไม่เป็นค่าว่าง
    if(email1 == '' || password1 == ''){
      Alert.alert('โปรดใส่รหัสผ่าน');
      return;
    }
    fetch(http1+'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email1,
        password: password1,
      }),
    })
    .then(response => response.json())
    .then(async data => {
      if (data.status === 'ok') {
        try {
          await AsyncStorage.setItem('token', data.token);
          // ทำการเรียก API เพื่อรับ id ของ user
          const response = await fetch(http1+'user/'+email1);
          const user = await response.json();
          const userId = user.map(u => u.id_login);
          console.log('User ID:', userId);
          // ตรวจสอบว่าได้รับ id user และไม่เป็น array ว่าง
          if(userId.length > 0) {
            updateIdUser(userId[0]); // อัปเดต idUser ใน context
            navigation.navigate('profile2',{email1:email1}); // นำทางไปยังหน้า 'profile2'
          }
        } catch (error) {
          console.error('AsyncStorage error:', error);
        }
      } else {
        Alert.alert('Error', 'Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during login.');
    });
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
          เข้ารหัสเพื่อเข้าสู่ระบบ
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
            <Fontisto name="locked" size={35} color="#2D0C57"></Fontisto>
          </View>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 170,
              marginBottom: 5,
              fontWeight: 'bold',
            }}>
            Email
          </Text>
          <TextInput
            placeholder="Email"
            style={{
              backgroundColor: '#fff',
              color: '#9F9F9F',
              borderRadius: 20,
              width: 400,
              borderWidth: 1,
              borderColor: '#CDD1E0',
              height: 60,
            }}
            value={email1}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"></TextInput>
          <Text
            style={{
              color: '#2D0C57',
              fontSize: 20,
              right: 150,
              marginTop: 10,
              marginBottom: 5,
              fontWeight: 'bold',
            }}>
            Password
          </Text>
          <TextInput
            placeholder="Password"
            value={password1}
            onChangeText={setPassword}
            secureTextEntry
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
            }} onPress={handleLogin}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#fff',
              }}>
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 400,
              height: 60,

              marginTop: 10,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('register')}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#9586A8',
              }}>
              สมัครสมาชิก
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default Login;
