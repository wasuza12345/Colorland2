import { View, Text ,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {
    const [user,setUser]=useState({})
    const [isloading,setIsloading] = useState(true)
    const fetchUser = async()=>{
        const accessToken = await AsyncStorage.getItem('@accessToken')
        const response = await fetch('https://www.melivecode.com/api/auth/user',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json', //เป็นการเเลกเปลียน json
                'Authorization': 'Bearer '+ accessToken
              },
        })
        const data = await response.json()
        if (data.status === 'forbiden'){
            navigation.navigate('Login')
        }
        setUser(data.user)
        setIsloading(false)
    }
    useEffect(()=>{
        fetchUser()
    },[isloading])
  return (
    <View>
      <Text>{user.fname}</Text>
      <Text>{user.lname}</Text>
      <Text>{user.username}</Text>
      <Image source={{uri:user.avatar}} style={{width:100,height:100}}/>
      
    </View>
  )
}

export default Profile