import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Cart = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [id_flower, setId_flower] = useState([]);

  useEffect(() => {
    fetch('http://10.1.73.33:3000/read/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => setItems(result));
  }, [items]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const ddd = id1 => {
    const id = id1;
    fetch('http://10.1.73.33:3000/delete/cart/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetch('http://10.1.73.33:3000/read/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => setItems(result));
  };

  return (
    <ScrollView
      style={a.flex}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={a.Box}>
        <View style={a.tebcart}>
          <Text style={a.textcart}>ตระกร้า</Text>
          <View style={a.boxunderline}></View>
        </View>
        {items.map(d => (
          <View key={d.id} style={a.box}>
            <View style={a.boxin}>
              <Image
                source={{uri: d.image_flower}}
                style={{
                  width: 53,
                  height: 53,
                  marginLeft: 10,
                  borderRadius: 10,
                }}></Image>
              <View style={a.nameprice}>
                <Text style={{color: '#000000'}}>{d.name_flower}</Text>
                <Text style={a.price1}>{d.price_flower}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#DE6363',
                  width: 80,
                  height: 40,
                  borderRadius: 100,
                  position: 'absolute',
                  marginLeft: 320,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                onPress={()=>ddd(d.id)}>
                <View>
                  <Text
                    style={{textAlign: 'center', color: '#fff', fontSize: 15}}>
                    ลบ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{backgroundColor: '#fff', width: '100%', height: 500}} />
      </View>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#EED6D6',
    flexDirection: 'column',
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',

    borderColor: '#BFBFBF',
    borderBottomWidth: 1,
  },
  boxin: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    position: 'relative',
  },
  Box: {
    flex: 1,
    backgroundColor: '#f00',
    marginTop: 90,
    borderRadius: 10,
  },
  tebcart: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  textcart: {
    marginLeft: 10,
    // textDecorationLine: 'underline',
    color: '#EF43D2',
    fontWeight: 'bold',
  },
  nameprice: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  price1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF43D1',
  },
  boxunderline: {
    width: 32,
    height: 2,
    backgroundColor: '#EF43D1',
    marginLeft: 17,
  },
});
export default Cart;
