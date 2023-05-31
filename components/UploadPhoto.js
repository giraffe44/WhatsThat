import React, { useState, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { UPDATE_USER_PHOTO } from '../config'
import { AuthContext } from '../App'; 
import { useIsFocused } from '@react-navigation/native';

const UserPhoto = ({navigation}) => {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { userToken, userId } = useContext(AuthContext);
  const isFocused = useIsFocused()

  if (!permission) {
    requestPermission()
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });

      // Convert from base64 to blob using the fetch api
      const url = photo.uri;
      const photoBlob = await fetch(url).then(res => res.blob())

      fetch(UPDATE_USER_PHOTO(userId), {
        method: 'POST',
        headers: {
          'Content-Type': 'image/png',
          'Content-Transfer-Encoding': 'base64',
          'X-Authorization': userToken
        },
        body: photoBlob
      })
        .catch(error => {
          console.error('Error blob:', error);
        });

    } catch (error) {
      console.error('Error takePhoto:', error);
    }
  }


  return (
    <View>
       { isFocused && (<Camera style={{ minHeight: 300 }} type={type} ref={cameraRef} />)}
      <View>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text style={{ fontSize: 20, marginTop: 10, textAlign: 'center' }}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text style={{ fontSize: 20, marginTop: 10, textAlign: 'center' }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button title="Update your profile" onPress={() => {
          navigation.push('Profile')
        }} />
      </View>
    </View>
  );

}

export default UserPhoto;
