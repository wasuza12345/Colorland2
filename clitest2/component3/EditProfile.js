import { View, Text, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = () => {
  const [image, setImage] = useState(null); // เริ่มต้นด้วยค่า null

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path); // อัปเดต URI ของภาพ
    });
  };

  const photoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path); // อัปเดต URI ของภาพ
    });
  };

  return (
    <View>
      {/* ตรวจสอบก่อนว่ามี image URI ก่อนแสดง Image */}
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <Text>Edit Profile</Text>
      <Button title='Take Photo' onPress={takePhoto} />
      <Button title='Choose Photo From Library' onPress={photoFromLibrary} />
    </View>
  );
}

export default EditProfile;
