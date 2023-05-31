import React, { useEffect, useState, useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { GET_USER_PHOTO } from '../config'
import { AuthContext } from '../App';
import { MaterialIcons } from '@expo/vector-icons';


const UserPhoto = ({ userId, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [userPhoto, setUserPhoto] = useState('')

  useEffect(() => {
    fetch(GET_USER_PHOTO(userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setUserPhoto(base64data);
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error get user photo:', error);
      });
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={()=>{
        navigation.push('UploadPhoto')
      }}>
        {!!userPhoto && <Image style={{ height: 50, width: 50 }} source={{ uri: userPhoto }} />}
        {!userPhoto && (
          <View style={{ marginTop: 5 }}>
            <MaterialIcons name="add-a-photo" size={40} color="#333" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default UserPhoto;
