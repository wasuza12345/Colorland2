import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,Modal,Alert
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useIdUser } from './IdUserProvider';
import { useNavigation } from '@react-navigation/native';//รีเฟซหน้าเองเมื่อ focus
import AsyncStorage from '@react-native-async-storage/async-storage';
const Detail = ({navigation, route}) => {
  const [token, setToken] = useState('');
  const navigation2 = useNavigation();//รีเฟซหน้าเองเมื่อ focus
  const {idUser} = useIdUser()
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  
  const idcart = route.params.id;
  console.log(idcart)
  console.log(count)
  const refRBSheet = useRef();
  const onPressNagative = () => setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  const onPressPositive = () => setCount(prevCount => prevCount + 1);
  const openRBSheetWithProductName = () => {
    setCount(0);
    console.log(count)

    refRBSheet.current.open();
  };
  useEffect(() => {
    const unsubscribe = navigation2.addListener('focus', () => {
      // โหลดข้อมูลหรือทำอะไรก็ตามที่คุณต้องการเมื่อหน้าได้รับ focus
      AsyncStorage.getItem('token')
      .then(value => {
        setToken(value);
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
      });
    });

    return unsubscribe;
  }, [navigation2]);

  const addcart =()=>{
    console.log('addcart:'+token)
    if(!token){
      Alert.alert('โปรดlogin เพื่อเข้าสู่ระบบ')
      return
    }
    if (count == 0) {
      setModalVisible(true);
      return;
    }
    fetch('http://192.168.1.204:3000/api/addcart',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'authtoken': token
      },
      body:JSON.stringify({
        id_fower: idcart,
        value:count,
        id_user:idUser
        

      })
    })
    setModalVisible2(true);
  }
  useEffect(() => {
    let timer;

    if (modalVisible) {
      timer = setTimeout(() => {
        setModalVisible(false);
      }, 5);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [modalVisible]);
  useEffect(() => {
    let timer;

    if (modalVisible2) {
      timer = setTimeout(() => {
        setModalVisible2(false);
      }, 5);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [modalVisible2]);
  return (
    <ScrollView style={a.flex1}>
      <View style={a.flex1}>
        <View style={a.box1}>
          <Image source={{uri: route.params.image}} style={a.image}></Image>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', top: 25, left: 10}}>
            <AntDesign name="left" size={22} color={'#fff'}></AntDesign>
          </TouchableOpacity>
        </View>
        <View style={a.box2}>
          <Text style={a.name}>{route.params.name}</Text>
          <Text style={a.price}>{route.params.price}</Text>
          <Text style={a.tad}>฿/ถาด</Text>
          <Text style={a.textdetail}>รายละเอียด</Text>
          <Text style={a.detail}>{route.params.detail}</Text>

          <TouchableOpacity
            style={a.add_to_cart}
            onPress={() => openRBSheetWithProductName()}>
            <AntDesign name="shoppingcart" size={30} color={'#fff'}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity style={a.buy}>
            <Text style={a.textbuy}>ซื้อ</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={350}
          customStyles={{
            // style
            container: {
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: '#F6F5F5',
            },
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#A259FF',
              // position:'absolute'
            },
          }}>
             <ScrollView style={a.flexbar}>
                <View style={a.flexbarin}>
                  <Image source={{uri: route.params.image}} style={a.imagebar}></Image>
                  <Text style={a.textbarL}>{route.params.name}</Text>
                  <Text style={a.pricebar}>{route.params.price}</Text>
                  <Text style={a.tadbar}>  ฿/ถาด</Text>
                </View>
              </ScrollView>
             <Text style={a.count1}>{count}</Text>
              <Text style={a.value}>จำนวน</Text>
              <TouchableOpacity style={a.boxNagative} onPress={onPressNagative}>
                <Text style={a.np}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={a.boxPositive} onPress={onPressPositive}>
                <Text style={a.np}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={a.addtocart} onPress={()=>addcart()}>
                <AntDesign
                  name="shoppingcart"
                  size={25}
                  color={'#fff'}></AntDesign>
                <Text style={a.textcart}>เพิ่มลงตระกร้า</Text>
              </TouchableOpacity>
          </RBSheet>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={a.centeredView}>
          <View style={a.modalView}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={100}
              color="#fff"></MaterialCommunityIcons>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={a.centeredView}>
          <View style={a.modalView1}>
            <Octicons name='issue-closed' size={90} color='#fff' style={{padding:10}}></Octicons>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  modalView1: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#5bf355',
    borderRadius: 100,
    bottom: 50,
    opacity:0.5
  },
  modalView: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#ff0f0f',
    borderRadius: 100,
    bottom: 50,
    opacity:0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textcart: {
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    padding: 20,
    fontSize: 15,
    color: '#fff',
  },
  addtocart: {
    width: 360,
    height: 60,
    backgroundColor: '#0ab674',
    position: 'absolute',
    top: 280,
    left: 30,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tadbar: {
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    fontSize: 19,
    left: 270,
    top: '38.9%',
    position: 'absolute',
  },
  pricebar: {
    fontFamily: 'Righteous-Regular',
    fontSize: 25,
    color: '#44266A',
    top: 60,
    position: 'absolute',
    marginLeft: 230,
  },
  textbarL: {
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: 20,
    color: '#44266A',
    top: 20,
  },
  imagebar: {
    width: 187,
    height: 150,
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 15,
  },
  flexbarin: {
    flexDirection: 'row',
    position: 'relative',
  },
  flexbar: {
    flex: 1,
  },
  boxPositive: {
    width: 30,
    height: 30,
    backgroundColor: '#0BCE83',
    position: 'absolute',
    left: 370,
    top: 230,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  np: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#fff'
  },
  boxNagative: {
    width: 30,
    height: 30,
    // borderWidth: 2,
    position: 'absolute',
    top: 230,
    left: 290,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#989898',
    backgroundColor:'#fc6d6a'
  },
  value: {
    fontSize: 20,
    position: 'absolute',
    marginLeft: 20,
    top: 232,
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    color: '#000',
  },
  count1: {
    fontSize: 20,

    position: 'absolute',
    left: 340,
    top: 232,
    borderRadius: 10,
    color: '#000',
  },
  flex1: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    height: 860,
  },
  box1: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 333,
  },
  box2: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ECE8EF',
    position: 'absolute',
    marginTop: 300,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
    color: '#44266A',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
    color: '#44266A',
  },
  tad: {
    fontSize: 22,
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    position: 'absolute',
    left: 90,
    top: 94,
  },
  textdetail: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    paddingTop: 20,
    paddingLeft: 20,
    color: '#44266A',
  },
  detail: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buy: {
    width: 200,
    height: 60,
    backgroundColor: '#A259FF',
    borderRadius: 10,
    position: 'absolute',
    marginLeft: 190,
    marginTop: 440,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_to_cart: {
    width: 150,
    height: 60,
    backgroundColor: '#0BCE83',
    position: 'absolute',
    marginTop: 440,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbuy: {
    fontSize: 25,
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    color: '#fff',
  },
});
export default Detail;
