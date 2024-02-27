import {
  View,
  Text,
  Imag,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Ahome = ({navigation}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://www.melivecode.com/api/attractions')
      .then(res => res.json())
      .then(res => {
        setItems(res);
      });
  }, []);

const aa=(id,name,image)=>{
    navigation.navigate('Adetail',{id:id,name:name,image:image})
}
  return (
    <ScrollView style={a.bg}>
      {items.map(d => (
        <View key={d.id}>
          <Pressable onPress={()=>aa(d.id,d.name,d.coverimage)}>
            <Image
              source={{
                uri: d.coverimage,
              }}
              style={a.lmage2}></Image>
              <Text style={a.name}>{d.name}</Text>
              <View>
              <Text style={a.detail}>{d.detail}</Text>
              </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
const a = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  detail:{
    margin:5,
    color:'#fff',
    textAlign:'center'
  }
  ,name:{
    textAlign:'center'
    ,fontSize:20
    ,marginTop:10,color:'#fff'
  },lmage2:{
    with:'100%',
    height:200,
    borderRadius: 100,
    marginTop:10,
    marginLeft:10,
    marginRight:10
  },
  bg:{
    flex:1,
    backgroundColor:'#385199'
  }
 
});

export default Ahome;
