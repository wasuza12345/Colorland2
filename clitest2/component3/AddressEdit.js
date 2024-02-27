import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native'; //รีเฟซหน้าเองเมื่อ focus
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIdUser} from './IdUserProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AddressEdit = () => {
  const navigation2 = useNavigation(); //รีเฟซหน้าเองเมื่อ focus
  const [token, setToken] = useState('');
  const {idUser} = useIdUser();
  const [newAddress, setNewAddress] = useState([]);

  const http1 = 'http://192.168.1.204:3000/api/';
  AsyncStorage.getItem('token').then(value => {
    setToken(value);
  });
  useEffect(() => {
    const unsubscribe = navigation2.addListener('focus', () => {
      AsyncStorage.getItem('token')
        .then(value => {
          setToken(value);
          console.log(token);
        })
        .catch(error => {
          console.error('AsyncStorage error: ', error.message);
        });
      fetch(http1 + 'user2/' + idUser)
        .then(res => res.json())
        .then(res => {
          const d = res.map(data => data.address);
          setNewAddress(d);
          console.log('d: ' + d);
        });
    });
    return unsubscribe;
  }, [navigation2]);

  const updateAddress = () => {
    fetch(http1 + 'Address/' + idUser, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authtoken: token,
      },
      body: JSON.stringify({
        address: newAddress,
      }),
    });
    Alert.alert('เเก้ไขเรียบร้อย');
    navigation2.goBack()
  };
  return (
    <View style={{backgroundColor:'#ECE8EF',flex:1}}>
      <TouchableOpacity style={{flexDirection:'row',marginTop:10,alignItems:'center'}} onPress={()=>navigation2.goBack()}>
      <AntDesign name="left" size={22} color={'#000'}></AntDesign>
      <Text style={{fontFamily:'NotoSansThai-VariableFont_wdth,wght',fontSize:22,color:'#44266A'}}>
        เเก้ไขที่อยู๋ที่จัดส่ง
      </Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <TextInput
          value={String(newAddress)}
          onChangeText={setNewAddress}
          style={{
            width: 400,
            height: 100,
            margin: 10,
            borderRadius: 20,
            borderWidth: 3,
            borderColor: '#44266A',
            fontSize:20,backgroundColor:'#fff',fontFamily:'NotoSansThai-VariableFont_wdth,wght',
            
          }}></TextInput>
      </View>
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={{width:200,height:60,backgroundColor:'#44266A',borderRadius: 100,justifyContent:'center',alignItems:'center'}}
      onPress={updateAddress}>
        <Text style={{fontFamily:'NotoSansThai-VariableFont_wdth,wght',fontSize:20,color:'#fff'}}>ยืนยันเเก้ไข</Text>
      </TouchableOpacity>
      </View>
     
     
     
    </View>
  );
};

export default AddressEdit;
