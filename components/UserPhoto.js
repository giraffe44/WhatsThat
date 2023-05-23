import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {GET_USER_PHOTO} from '../config'
import { AuthContext } from '../App';

const UserPhoto = ({userId}) => {
  const {userToken} = useContext(AuthContext);
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
      .then(photo => {
        const img = URL.createObjectURL(photo);
        setUserPhoto(img)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <View>
      <img style={{height: 50, width: 50}} src={userPhoto} />
    </View>
  );

}

export default UserPhoto;
