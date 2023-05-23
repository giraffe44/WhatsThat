import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {AuthContext} from '../App.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {token} = useContext(AuthContext);


  return (
    <View>
      <TextInput
        placeholder="email..."
        onChangeText={(text) => { setEmail(text) }}
        value={email}
      />
      <TextInput
        placeholder="password..."
        onChangeText={(password) => { setPassword(password) }}
        value={password}
      />
      <Button title="Login" onPress={() => {
        fetch('http://localhost:3333/api/1.0.0/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then(response => response.json())
          .then(data => {
            navigation.navigate('ChatList')
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }}
      />

      <Text
        onPress={() => navigation.navigate('Signup')}
      >
        New here? Create an account
      </Text>
    </View>
  );

}

export default Login;
