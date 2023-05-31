import React, { useEffect, useState, useContext } from 'react';
import { View, Button } from 'react-native';
import { AuthContext } from '../App';
import {GET_USER, UPDATE_USER} from '../config'
import TextInput from './subcomponents/TextInput.js'

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const {userToken, userId} = useContext(AuthContext);

  useEffect(() => {
    fetch(GET_USER(userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.json())
      .then(data => {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={{padding: 20}}>
      <TextInput
        marginTop={100}
        placeholder="Your first name"
        onChangeText={(text) => { setFirstName(text) }}
        value={firstName}
      />
      <TextInput
        marginTop={20}
        placeholder="Your last name"
        onChangeText={(text) => { setLastName(text) }}
        value={lastName}
      />
      <TextInput
        marginTop={20}
        placeholder="Your email"
        onChangeText={(text) => { setEmail(text) }}
        value={email}
      />
      <Button title="Save" onPress={() => {
        fetch(UPDATE_USER(userId), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userToken,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            // TODO: password?
          }),
        })
          // Server returns 200 OK
          .then(data => {
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', JSON.stringify(error));
          });
      }}
      />
    </View>
  );
}

export default Profile;
