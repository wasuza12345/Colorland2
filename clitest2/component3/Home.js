import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIdUser} from './IdUserProvider';
import { useNavigation } from '@react-navigation/native';//รีเฟซหน้าเองเมื่อ focus

const Home = ({navigation}) => {
  const [token, setToken] = useState('');
  const {idUser} = useIdUser();
  const [product, setProduct] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [aimage, setImage] = useState(''); // เพิ่ม state นี้
  const [aprice, setPrice] = useState('');
  const [id, setId] = useState('');
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const http1 = 'http://192.168.1.204:3000/api/';

  const navigation2 = useNavigation();//รีเฟซหน้าเองเมื่อ focus
  //รีเฟซหน้าเองเมื่อ focus
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

  const onPressNagative = () =>
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  const onPressPositive = () => setCount(prevCount => prevCount + 1);
  useEffect(() => {
    fetch(http1 + 'product')
      .then(res => res.json())
      .then(res => setProduct(res));
  }, [product]);
  const refRBSheet = useRef();
  const openRBSheetWithProductName = (name, image, price, id) => {
    setSelectedProductName(name); // อัปเดต state ด้วยชื่อผลิตภัณฑ์
    setImage(image);
    setPrice(price);
    setId(id);
    setCount(0);

    refRBSheet.current.open();
  };

  const go_to_detail = (name, detail, image, id, price) => {
    navigation.navigate('detail', {
      name: name,
      detail: detail,
      image: image,
      id: id,
      price: price,
    });
  };
  const addcart = () => {
  console.log('addcart:'+token)
    if(!token){
      Alert.alert('โปรดlogin เพื่อเข้าสู่ระบบ')
      return
    }
    if (count == 0) {
     
      setModalVisible(true);
      return;
    }
    fetch(http1 + 'addcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authtoken: token,
      },
      body: JSON.stringify({
        id_fower: id,
        value: count,
        id_user: idUser,
      }),
     
    });
    console.log('homcart: '+token)
    setModalVisible2(true);
  };

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
    <ScrollView style={{flex: 1, backgroundColor: '#ECE8EF'}}>
      <View
        style={{
          width: '100%',
          height: 150,
          alignItems: 'flex-start',
          backgroundColor: '#ECE8EF',
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: 30,
            margin: 20,
            top: 10,
            fontWeight: 'bold',
            color: '#44236C',
            fontFamily: 'Oswald-VariableFont_wght',
          }}>
          COLOURLAND
        </Text>
        <Pressable
          onPress={() => navigation.navigate('search')}
          style={{
            width: 380,
            height: 50,
            backgroundColor: '#F9F7FB',
            position: 'absolute',
            left: 10,
            top: 80,
            borderRadius: 100,
            borderWidth: 0.5,
            justifyContent: 'center',
            borderColor: '#C9C0D6',
          }}>
          <AntDesign
            name="search1"
            size={25}
            color={'#44236C'}
            style={{position: 'absolute', left: 20}}></AntDesign>
          <Text style={{left: 60, color: '#8D7AA5', fontSize: 18}}>Search</Text>
        </Pressable>
      </View>

      <View style={a.box1}>
        {product.map(data => (
          <View key={data.id} style={a.productF}>
            <Pressable
              onPress={() =>
                go_to_detail(
                  data.name,
                  data.detail,
                  data.image,
                  data.id,
                  data.price,
                )
              }>
              <Image source={{uri: data.image}} style={a.image}></Image>
            </Pressable>

            <Text style={a.text1}>{data.name}</Text>
            <Text style={a.price1}>{data.price}</Text>
            <Text style={a.pertad}> ฿/ถาด</Text>

            <TouchableOpacity
              style={a.buttonCart}
              onPress={() =>
                openRBSheetWithProductName(
                  data.name,
                  data.image,
                  data.price,
                  data.id,
                )
              }>
              <AntDesign
                name="shoppingcart"
                size={25}
                color={'#fff'}></AntDesign>
            </TouchableOpacity>
            <TouchableOpacity style={a.buttonLove}>
              <AntDesign name="hearto" size={20}></AntDesign>
            </TouchableOpacity>
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
                  <Image source={{uri: aimage}} style={a.imagebar}></Image>
                  <Text style={a.textbarL}>{selectedProductName}</Text>
                  <Text style={a.pricebar}>{aprice}</Text>
                  <Text style={a.tadbar}> ฿/ถาด</Text>
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
              <TouchableOpacity style={a.addtocart} onPress={() => addcart()}>
                <AntDesign
                  name="shoppingcart"
                  size={25}
                  color={'#fff'}></AntDesign>
                <Text style={a.textcart}>เพิ่มลงตระกร้า</Text>
              </TouchableOpacity>
            </RBSheet>
          </View>
        ))}
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
            <Octicons
              name="issue-closed"
              size={90}
              color="#fff"
              style={{padding: 10}}></Octicons>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#ff0f0f',
    borderRadius: 100,
    bottom: 50,
    opacity: 0.5,
  },
  modalView1: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#5bf355',
    borderRadius: 100,
    bottom: 50,
    opacity: 0.5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  box1: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ECE8EF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 45,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: '#308',
    borderRadius: 100,
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: '#800',
    borderRadius: 100,
  },
  image: {
    width: 187,
    height: '100%',
    borderRadius: 10,
  },
  productF: {
    width: 400,
    height: 150,
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    position: 'relative',
    marginLeft: 10,
  },
  search: {
    width: 100,
    height: 37,
    backgroundColor: '#308',
    borderRadius: 100,
  },
  text1: {
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: 20,
    color: '#44266A',
  },
  buttonCart: {
    width: 90,
    height: 50,
    backgroundColor: '#0BCE83',
    position: 'absolute',
    top: '60%',
    left: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLove: {
    width: 90,
    height: 50,
    backgroundColor: '#FDFCFD',
    position: 'absolute',
    top: '60%',
    left: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D6CFDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price1: {
    fontFamily: 'Righteous-Regular',
    fontSize: 25,
    left: 210,
    color: '#44266A',
    top: '30%',
    position: 'absolute',
  },
  pertad: {
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    fontSize: 19,
    left: 253,

    top: '33%',
    position: 'absolute',
  },
  imagebar: {
    width: 187,
    height: 150,
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 15,
  },
  textbarL: {
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: 20,
    color: '#44266A',
    top: 20,
  },
  flexbar: {
    flex: 1,
  },
  flexbarin: {
    flexDirection: 'row',
    position: 'relative',
  },
  pricebar: {
    fontFamily: 'Righteous-Regular',
    fontSize: 25,
    color: '#44266A',
    top: 60,
    position: 'absolute',
    marginLeft: 230,
  },
  tadbar: {
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    fontSize: 19,
    left: 270,
    top: '38.9%',
    position: 'absolute',
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
    backgroundColor: '#fc6d6a',
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
  count1: {
    fontSize: 20,

    position: 'absolute',
    left: 340,
    top: 232,
    borderRadius: 10,
    color: '#000',
  },
  value: {
    fontSize: 20,
    position: 'absolute',
    marginLeft: 20,
    top: 232,
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    color: '#000',
  },
  np: {
    fontSize: 20,
    fontWeight: 'bold',
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
  textcart: {
    fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
    padding: 20,
    fontSize: 15,
    color: '#fff',
  },
});
export default Home;
