import React, { useEffect, useState, useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../App';
import { GET_CONTACTS, ADD_CONTACT } from '../config';

const ContactsList = ({navigation}) => {
  const [contacts, setContacts] = useState([])
  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    fetch(GET_CONTACTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.json())
      .then(contacts => {
        setContacts(contacts)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View>
      {contacts.map((user) => {
        // user.id
        return (
          <View key={user.user_id}>
            <Button title={`Chat with ${user.first_name} ${user.last_name}`} onPress={() => {
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

export default ContactsList;
