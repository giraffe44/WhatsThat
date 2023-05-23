import React, { useEffect, useState, useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../App';

const ContactsList = () => {
  const [contacts, setContacts] = useState([])
  const {token} = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3333/api/1.0.0/contacts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
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

export default ContactsList;
