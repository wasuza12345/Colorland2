import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect, useState, useCallback} from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { useIdUser } from './IdUserProvider';
  import { useNavigation } from '@react-navigation/native';//รีเฟซหน้าเองเมื่อ focus
  const ReS1_1 = () => {
    
    const http1 = 'http://192.168.1.204:3000/api/';
    const [orderlist, setOrderlist] = useState([]);
    const [order, setOrder] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation2 = useNavigation();
    const { idUser } = useIdUser();
    
  
    useEffect(() => {
      if (idUser) {
        const fetchOrderList = async () => {
          try {
            const response = await fetch(http1 + 'AllOrderlist/' + idUser, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            setOrderlist(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
  
        fetchOrderList();
      }
    }, [idUser, http1]);
  
    useEffect(() => {
      const unsubscribe = navigation2.addListener('focus', () => {
        if (idUser) {
          fetch(http1 + 'AllOrderlist/' + idUser, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(res => res.json())
          .then(res => setOrderlist(res))
          .catch(error => console.error('Error:', error));
        }
      });
  
      return unsubscribe;
    }, [idUser, navigation2]);
  
    useEffect(() => {
      if (orderlist.length > 0) {
        const ids = encodeURIComponent(orderlist.map(order => order.id_order).join(','));
        fetch(http1 + 'multiOrders?ids=' + ids)
          .then(res => res.json())
          .then(data => setOrder(data))
          .catch(error => console.error('Error:', error));
      }
    }, [orderlist]);
  
    const onRefresh1 = useCallback(() => {
      setRefreshing(true);
      fetch(http1 + 'AllOrderlist/' + idUser)
        .then(res => res.json())
        .then(data => {
          setOrderlist(data);
          setRefreshing(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setRefreshing(false);
        });
    }, [idUser]);
  
    const go_to_detail = (idorder) => {
      navigation2.navigate('rs1.2', { idorder: idorder });
    };
  
    
    return (
      <View style={{backgroundColor: '#ECE8EF', flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh1} />
          }>
          <View
            style={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 50,
            }}>
            {order.map(data => (
              <TouchableOpacity
                key={data.idorder}
                style={{
                  width: '100%',
                  height: 130,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems:'center'
                }}
                onPress={()=>go_to_detail(data.idorder)}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20,fontFamily:'NotoSansThai-VariableFont_wdth,wght',color:'#000'}}>ลำดับที่</Text>
                  <View
                    style={{
                      
                      width: 80,
                      height: 80,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color:'#000',fontSize:20,fontWeight: 'bold',}}>{data.idorder}</Text>
                  </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20,fontFamily:'NotoSansThai-VariableFont_wdth,wght',color:'#000'}}>ราคารวม</Text>
                  <View
                    style={{
                     
                      width: 200,
                      height: 80,
                      // borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color:'#44266A',fontSize:30,fontWeight: 'bold',left:10}}>{data.price_t} ฿</Text>
                  </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize: 20,fontFamily:'NotoSansThai-VariableFont_wdth,wght',color:'#000'}}>จำนวนรวม</Text>
                  <View
                    style={{
                      
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color:'#000',fontSize:20,fontWeight: 'bold',}}>{data.count_t}</Text>
                  </View>
                </View>
                <AntDesign name='right' size = {15} ></AntDesign>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default ReS1_1;
  