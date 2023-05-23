import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../App';

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {token, userId} = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
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
    <View>
      <TextInput
        placeholder="Your first name"
        onChangeText={(text) => { setFirstName(text) }}
        value={firstName}
      />
      <TextInput
        placeholder="Your last name"
        onChangeText={(text) => { setLastName(text) }}
        value={lastName}
      />
      <TextInput
        placeholder="Your email"
        onChangeText={(text) => { setEmail(text) }}
        value={email}
      />
      <Button title="Save" onPress={() => {
        fetch(`http://localhost:3333/api/1.0.0/user/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            //TODO: password
          }),
        })
          // Server returns 200 OK
          .then(data => {
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }}
      />

      <Text
        onPress={() => navigation.back()}
      >
        Go back
      </Text>
    </View>
  );

}

export default Profile;
