import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { CREATE_USER } from '../config';
import TextInput from './subcomponents/TextInput.js'

const createUser = async (firstName, lastName, email, password, setError) => {
  try {
    const response = await fetch(CREATE_USER, {
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

    // navigation.navigate('Login')
    // const responseJson = await response.json()
    // console.log('Response:', responseJson);

  } catch (e) {
    console.log(e)
  }
}

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const checkPassword = () => {
    if (password === '') return true

    const password_regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return password_regex.test(password)
  }
  const isValidPassword = checkPassword()

  return (
    <View style={{ marginHorizontal: 40 }}>
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
      <TextInput
        marginTop={20}
        placeholder="Choose a password"
        secureTextEntry={true}
        onChangeText={(password) => { setPassword(password) }}
        value={password}
        error={isValidPassword ? null : "Password must be strong (greater than 8 characters inclusing one upper, one number, and one special character."}
      />

      {!!error && <Text style={{marginTop: 20, color: 'red'}}>{error}</Text>}

      <View style={{ marginBottom: 40, marginTop: 40 }}>
        <Button
          title="Create"
          onPress={() => {
            createUser(firstName, lastName, email, password, setError)
          }}
        />
      </View>
      <View>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={{ textAlign: 'center', color: '#333', fontSize: 18 }}
        >
          Already have an account? Login here
        </Text>
      </View>
    </View>
  );

}

export default Signup;
