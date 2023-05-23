import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const createUser = async (firstName, lastName, email, password, setError) => {
  try {
    const response = await fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    })

    if (response.status === 500) {
      setError("Server error, please try again later")
    } else if (response.status === 400) {
      const error = await response.text()
      setError(error)
      return
    }

    const responseJson = await response.json()
    console.log('Response:', responseJson);

  } catch (e) {
    console.log(e)
  }
}
const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
      <TextInput
        placeholder="Choose a password"
        onChangeText={(password) => { setPassword(password) }}
        value={password}
      />

      {!!error && <Text>{error}</Text>}

      <Button
        title="Create" 
        onPress={() => {
          createUser(firstName, lastName, email, password, setError)
        }}
      />
      <Text
          onPress={() => navigation.navigate('Login')}
        > 
          Already have an account? Login here
        </Text>
    </View>
  );

}

export default Signup;
