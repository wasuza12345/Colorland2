import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

const Adetail = ({route}) => {
  const [a, setItems] = useState([]);
  useEffect(() => {
    fetch('https://www.melivecode.com/api/attractions/' + route.params.id)
      .then(res => res.json())
      .then(res => {
        setItems(res.attraction);
      });
  }, []);
  return (
    <View>
      <Image source={{uri: a.coverimage}} style={them.lmage}></Image>
      <Text style={them.name}>{a.name}</Text>
      <Text>{a.detail}</Text>
    </View>
  );
};
const them = StyleSheet.create({
  lmage: {
    width: '100%',
    height: 200,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
    marginTop:20

  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 20,

  },
});
export default Adetail;
