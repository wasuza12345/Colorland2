import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const Detail = ({route, navigation}) => {
  const id1 =route.params.id;
  const image = route.params.image;
  const name = route.params.name;
  const detail = route.params.detail;
  const price =route.params.price
  // const [id_flower, setId_flower] = useState([]);
  // const [image_flower, setImage_flower] = useState([]);
  // const [price_flower, setPrice_flower] = useState([]);
  // const [name_flower, setName_flower] = useState([]);
  //เพิ่มข้อมูลลงตระกร้า
  
  const addCard = () => {
    // setId_flower(id1)
    // setImage_flower(image)
    // setName_flower(name)
    // setPrice_flower(price)
    console.log(id1)
    fetch('http://10.1.73.33:3000/create/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id_flower: id_flower,
        // image_flower: image_flower,
        // price_flower: price_flower,
        // name_flower: name_flower,
        id_flower: id1,
        image_flower: image,
        price_flower: price,
        name_flower: name,
      }),
    });
    
    // alert('test')
  };

  return (
    <ScrollView style={a.flex}>
      <View>
        <Image source={{uri: image}} style={a.image1}></Image>
        <Pressable style={a.pressable1} onPress={() => navigation.goBack()}>
          <View style={a.goback}>
            <Entypo name="chevron-thin-left" size={30} color="#fff"></Entypo>
          </View>
        </Pressable>
        <View style={a.box1}>
          

          <Button title="add to card" onPress={addCard}></Button>
        </View>
        <View style={a.box2}>
          <Text style={{textAlign: 'center'}}>{detail}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#C7C7C7',
    position: 'relative',
  },
  goback: {
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  image1: {
    width: '100%',
    height: 294,
  },
  pressable1: {
    position: 'absolute',
  },
  box1: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    marginTop: 9,
  },
  box2: {
    maxHeight: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 9,
    padding: 10,
  },
  input:{
    borderWidth:1,
    margin:2
  }
});
export default Detail;
