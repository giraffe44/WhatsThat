import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { AuthContext } from '../App.js'
import { SEARCH_USERS, ADD_CONTACT } from '../config'

const Search = () => {
  const [searchStr, setSearchStr] = useState('')
  const [users, setUsers] = useState([])
  const { userToken } = useContext(AuthContext);

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
    <View style={{ flex: 1 }}>
      <TextInput
        style={{fontSize: 20, marginVertical: 10, marginHorizontal: 20}}
        placeholder="Search for friends"
        onChangeText={(text) => { setSearchStr(text) }}
        value={searchStr}
      />

      <ScrollView style={{ flex: 1, marginHorizontal: 20, }}>
        {users.map((user) => {
          return (
            <View key={user.user_id}>
              <Text style={{ marginVertical: 10 }} key={user.user_id}>{user.family_name} {user.given_name} {user.email}</Text>
              <Button title={`Add ${user.given_name} as contact`} onPress={() => {
                console.log('Add contact')
                fetch(ADD_CONTACT(user.user_id), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken
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
      </ScrollView>
    </View>
  );

}

export default Search;
