import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../App.js'
import {SEARCH_USERS, ADD_CONTACT} from '../config'

const Search = ({navigation}) => {
  const [searchStr, setSearchStr] = useState('')
  const [users, setUsers] = useState([])
  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    fetch(SEARCH_USERS(searchStr), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
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
              fetch(ADD_CONTACT(user.user_id), {
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
