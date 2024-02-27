import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import data from './users.json';
const Test1 = ({route}) => {
  const d = data.find(o => o.id === route.params.id);
  return (
    <View style={a.big1}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image source={{uri: d.avatar}} style={a.lmage}></Image>
      </View>
      <Text style={{textAlign: 'center', color: '#fff', marginTop: 10}}>
        {d.fname + ' ' + d.lname}
      </Text>
      <Text style={{textAlign: 'center', color: '#fff',marginTop:5}}>{d.username}</Text>
    </View>
  );
};
const a = StyleSheet.create({
  big1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#308',
  },
  lmage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default Test1;
