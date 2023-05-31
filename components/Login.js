import React, { useState, useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../App.js'
import { LOGIN } from '../config'
import TextInput from './subcomponents/TextInput.js'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('a@a.com')
  const [password, setPassword] = useState('passwordAA$9')
  const [error, setError] = useState('');
  const { userLogin } = useContext(AuthContext)

  return (
    <View style={{ marginHorizontal: 40 }}>
      <TextInput
        marginTop={100}
        name="Email"
        placeholder="Email"
        onChangeText={(text) => { setEmail(text); setError('') }}
        value={email}
      />
      <TextInput
        marginTop={100}
        name="Password"
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(password) => { setPassword(password); setError('') }}
        value={password}
      />
      {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
      <View style={{ marginBottom: 20, marginTop: 80 }}>
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
            .then(response => {
              setError('')
              // 200 All good

              // 400 Invalid email/password supplied
              if (response.status === 400) {
                throw new Error('Invalid email/password supplied')
              }
              
              // 500 server error
              if (response.status === 500) {
                throw new Error('Server error')
              }

              return response
            })
            .then(response => response.json())
            .then(data => {
              userLogin({
                userToken: data.token,
                userId: data.id,
              })
              navigation.push('ChatList')
              // console.log('Response:', data);
            })
            .catch(error => {
              setError(error.message)
              // console.error('Error:', error);
            });
        }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{ textAlign: 'center', color: '#333', fontSize: 18 }}
          onPress={() => navigation.push('Signup')}
        >
          New here? Create an account
        </Text>
      </View>
    </View>
  );
}

export default Login;
