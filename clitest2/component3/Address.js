import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native'; //รีเฟซหน้าเองเมื่อ focus
import {useIdUser} from './IdUserProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Address = ({navigation, route}) => {
  const http1 = 'http://192.168.1.204:3000/api/';
  const navigation2 = useNavigation(); //รีเฟซหน้าเองเมื่อ focus
  const {idUser} = useIdUser();
  const [newAddress, setNewAddress] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation2.addListener('focus', () => {
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

  return (
    <View style={{backgroundColor:'#ECE8EF',flex:1}}>
      <View>
      <TouchableOpacity style={{flexDirection:'row',marginTop:10,alignItems:'center'}} onPress={()=>navigation2.goBack()}>
      <AntDesign name="left" size={22} color={'#000'}></AntDesign>
      <Text style={{fontFamily:'NotoSansThai-VariableFont_wdth,wght',fontSize:22,color:'#44266A'}}>
         กลับหน้าโปรไฟล์
      </Text>
      </TouchableOpacity>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#A259FF',
            width: 400,
            height: 100,
            borderRadius: 20,
            justifyContent:'center',
            alignItems:'center',
            margin: 10,
            
            
          }} onPress={()=>navigation2.navigate('addedit')}>
          <Text style={{fontFamily:'NotoSansThai-VariableFont_wdth,wght',fontSize:20,color:'#fff'}}>{newAddress}</Text>
          <View style={{width:100,height:30,backgroundColor:'#000',borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:10}}>
            <Text style={{color:'#fff',fontFamily:'NotoSansThai-VariableFont_wdth,wght'}}>
              เเก้ไข
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // <Button title='go to edit' onPress={()=>navigation.navigate('addedit')}></Button>
  );
};

export default Address;
