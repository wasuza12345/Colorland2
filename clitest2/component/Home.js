import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import data from './users.json';
const home = ({navigation}) => {
  const test=(id,fname,avatar)=>{
    navigation.navigate('Test1',{id:id,fname:fname,avatar:avatar})
  }
  return (
    <ScrollView>
      <View style={a.bg}>
        {data.map(d => (
          <View key={d.id} style={a.box}>
            <Pressable onPress={()=>test(d.id,d.fname,d.avatar)}>
            <View style={a.boxsmall}>
              <Image source={{uri: d.avatar}} style={a.lmage}></Image>
              <Text style={a.text1}>{d.fname + ' ' + d.lname}</Text>
              <Text style={a.text}>{d.username}</Text>
            </View>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  lmage: {
    margin: 10,
    width: 100,
    height: 100,
  },
  bg: {
    flex: 1,
    backgroundColor: '#308',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    color: '#fff',
  },
  text1: {
    color: '#fff',
    // textAlign:'center',
  },
  box: {
    flex: 1,
    backgroundColor: '#0F9357',
    width:'100%',height:'100%',
    padding:10
    
  },
  boxsmall:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
});

export default home;
