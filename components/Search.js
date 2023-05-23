import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../App.js'

const Search = () => {
  const [searchStr, setSearchStr] = useState('')
  const [users, setUsers] = useState([])
  const {token} = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3333/api/1.0.0/search?q=${searchStr}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
    })
      .then(response => response.json())
      .then(users => {
        console.log(users)
        setUsers(users)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [searchStr]);

  return (
    <View>
      <TextInput
        placeholder="Find your friends"
        onChangeText={(text) => { setSearchStr(text) }}
        value={searchStr}
      />

      {users.map((user) => {
        return (
          <View key={user.user_id}>
            <Text style={{marginVertical: 10}} key={user.user_id}>{user.family_name} {user.given_name} {user.email}</Text>
            <Button title={`Add ${user.given_name} as contact`} onPress={() => {
              fetch(`http://localhost:3333/api/1.0.0/user/${user.user_id}/contact`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': token
                },
              })
                // Server just replies OK 200
                .then(data => {
                  console.log(data)
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }} />
          </View>
        )
      })}

      <Text
        onPress={() => navigation.back()}
      >
        Go back
      </Text>
    </View>
  );

}

export default Search;
