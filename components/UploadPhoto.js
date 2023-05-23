import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { UPDATE_USER_PHOTO } from '../config'
import { AuthContext } from '../App';


const UserPhoto = () => {
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { userToken, userId } = useContext(AuthContext);

  // TODO: check permissions

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePhoto = async (props) => {
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });

    // Convert from base64 to blob using the fetch api
    var url = photo.uri;
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
        console.error('Error:', error);
      });
  }


  return (
    <View>
      <Camera style={{ minHeight: 300 }} type={type} ref={cameraRef}>
        <View>
          <TouchableOpacity onPress={toggleCameraType}>
            <Text>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Text>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );

}

export default UserPhoto;
