import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'; //รีเฟซหน้าเองเมื่อ focus
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Profile1_2 = ({navigation, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setuser] = useState([]);
  const http1 = 'http://192.168.1.204:3000/api/';
  const email = route.params.email1;
  const navigation2 = useNavigation(); //รีเฟซหน้าเองเมื่อ focus
  //เรียกดู user
  useEffect(() => {
    const unsubscribe = navigation2.addListener('focus', () => {
      // โหลดข้อมูลหรือทำอะไรก็ตามที่คุณต้องการเมื่อหน้าได้รับ focus
      fetch(http1 + 'user/' + email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setuser(res));
    });

    return unsubscribe;
  }, [navigation2]);

  //refresh
  const onRefresh1 = useCallback(() => {
    fetch(http1 + 'user/' + email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setuser(res));

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 50);
  }, []);
  //logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('logout');
      navigation.navigate('login');
    } catch (error) {
      console.error('AsyncStorage error:', error);
    }
  };

  const address = (address) =>{
    console.log(address)
    navigation.navigate('Address',{address:address})

  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh1} />
      }
      style={{backgroundColor: '#7519EB'}}>
      {user.map(data => (
        <View key={data.id_login}>
          <View
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              backgroundColor: '#8C33FF',
              borderRadius: 100,
              right: 250,
              top: 20,
            }}></View>
          <View
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              backgroundColor: '#8C33FF',
              borderRadius: 100,
              left: 220,
              top: 50,
            }}></View>
          <View
            style={{
              width: 300,
              height: 300,
              position: 'absolute',
              backgroundColor: '#A259FF',
              borderRadius: 200,
              left: 200,
              bottom: 10,
            }}></View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: data.image_user}}
              // source={{uri:"https://i.ibb.co/BjVS3XV/Screenshot-1708863246.png" }}

              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                margin: 10,
                marginBottom:30
              }}></Image>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 25,
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#fff',
              }}>
              {data.name}
            </Text>
            <TouchableOpacity
              style={{
                width: 80,
                height: 35,
                backgroundColor: '#44266A',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute',
                left:140,
                top:100
                
              }} onPress={()=>navigation.navigate('EditProfile')}>
              <Text
                style={{
                  fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                  color: '#fff',
                }}>
                เเก้ไขโปรไฟล์
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          height: 800,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop:10
        }}>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              // backgroundColor: '#',
              borderBottomWidth: 1,
              borderBottomColor: '#D7D7D7',
              flexDirection: 'row',
              alignItems: 'center',
            }} onPress={()=>navigation.navigate("Favorites")}> 
            <AntDesign
              name="heart"
              size={25}
              color="#44266A"
              style={{marginLeft: 30}}></AntDesign>
            <Text
              style={{
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#44266A',
                fontSize: 20,
                marginLeft: 10,
              }}>
              รายการโปรด
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              // backgroundColor: '#',
              borderBottomWidth: 1,
              borderBottomColor: '#D7D7D7',
              flexDirection: 'row',
              alignItems: 'center',
            }} onPress={()=>address(user.map(data=>(data.address)))}>
            <FontAwesome
              name="map-marker"
              size={30}
              color="#44266A"
              style={{marginLeft: 32.5}}></FontAwesome>
            <Text
              style={{
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#44266A',
                fontSize: 20,
                marginLeft: 13,
              }}>
              ที่อยู่ที่จัดส่ง
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              // backgroundColor: '#',
              borderBottomWidth: 1,
              borderBottomColor: '#D7D7D7',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="book"
              size={25}
              color="#44266A"
              style={{marginLeft: 30}}></FontAwesome5>
            <Text
              style={{
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#44266A',
                fontSize: 20,
                marginLeft: 12,
              }}>
              นโยบาย
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              // backgroundColor: '#',
              borderBottomWidth: 1,
              borderBottomColor: '#D7D7D7',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="support-agent"
              size={25}
              color="#44266A"
              style={{marginLeft: 30}}></MaterialIcons>
            <Text
              style={{
                fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                color: '#44266A',
                fontSize: 20,
                marginLeft: 10,
              }}>
              ช่วยเหลือ
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, width: '100%',alignItems:'center'}}>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              backgroundColor: '#E77979',
              borderRadius: 100,
              alignItems:'center',
              justifyContent:'center'
            }} onPress={handleLogout}><Text style={{color:'#fff',fontSize:20,fontFamily:'NotoSansThai-VariableFont_wdth,wght'}}>ออกจากระบบ</Text></TouchableOpacity>
        </View>
      </View>

      <Button title='favorites' onPress={()=>navigation.navigate('Favorites')}></Button>
   <Button title='EditProfile' onPress={()=>navigation.navigate('EditProfile')}></Button>
   <Button title='Address' onPress={()=>navigation.navigate('Address')}></Button>
    </ScrollView>
  );
};

export default Profile1_2;
