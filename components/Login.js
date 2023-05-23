import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {AuthContext} from '../App.js'
import {LOGIN} from '../config'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {isUserLoggedIn, userLogin} = useContext(AuthContext);

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
        fetch(LOGIN, {
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
            userLogin({
              userToken: data.token,
              userId: data.id,
            })
            navigation.push('ChatList')
            // navigation.navigate('ChatList')
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }}
      />

      <Text
        onPress={() => navigation.push('Signup')}
      >
        New here? Create an account
      </Text>
    </View>
  );

}

export default Login;
