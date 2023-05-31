import React, { useEffect, useState, useContext } from 'react';
import { View, Button, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../App';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

import {
  GET_CONTACTS,
  BLOCK_CONTACT,
  GET_BLOCKED_CONTACTS,
  UNBLOCK_CONTACT,
  REMOVE_CONTACT,
  ADD_USER_TO_CHAT,
} from '../config';

const ContactsList = ({ navigation }) => {
  const [contacts, setContacts] = useState([])
  const { userToken } = useContext(AuthContext);
  const [showBlocked, setShowBlocked] = useState(false)

  const route = useRoute();
  const chatId = route.params.chatId

  const fetchContacts = () => {
    const endpoint = showBlocked ? GET_BLOCKED_CONTACTS : GET_CONTACTS
    fetch(endpoint, {
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
  }

  useEffect(() => {
    setContacts([])
    fetchContacts()
  }, [showBlocked]);

  const addToChat = (userId) => {
    fetch(ADD_USER_TO_CHAT(chatId, userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      // Server just replies OK 200
      .then(() => {
        navigation.goBack()
        // console.log(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const blockOrUnblockUser = (userId) => {
    const endpoint = showBlocked ? UNBLOCK_CONTACT : BLOCK_CONTACT
    const method = showBlocked ? 'DELETE' : 'POST'
    fetch(endpoint(userId), {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      // Server just replies OK 200
      .then(() => {
        fetchContacts()
        // console.log(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const removeContact = (userId) => {
    fetch(REMOVE_CONTACT(userId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      // Server just replies OK 200
      .then(() => {
        fetchContacts()
        // console.log(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: '#ededed' }}>
        <Text style={{ fontSize: 20 }}>
          {showBlocked ? 'Showing blocked contacts' : 'Showing all my contacts'}
        </Text>
        <TouchableOpacity onPress={() => setShowBlocked(!showBlocked)}>
          <Ionicons name="swap-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>


      <ScrollView style={{ flex: 1, marginHorizontal: 20, }}>
        {contacts.map((user) => {
          return (
            <View key={user.user_id} style={{ marginVertical: 20, marginHorizontal: 10, borderRadius: 10, backgroundColor: '#8dcad6' }}>
              <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 20 }}>{user.first_name} {user.last_name}</Text>
              
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                {!showBlocked && (<Button title={`Add ${user.first_name} ${user.last_name} to chat`} onPress={() => addToChat(user.user_id)} />)}
                <Ionicons name="person-add-outline" size={28} color="black" />
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Button title={`${showBlocked ? 'Unblock' : 'Block'} ${user.first_name} ${user.last_name}`} onPress={() => blockOrUnblockUser(user.user_id)} />
                <Entypo name="block" size={28} color="black" />
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Button title={`Delete ${user.first_name} ${user.last_name}`} onPress={() => removeContact(user.user_id)} />
                <AntDesign name="delete" size={28} color="black" />
              </View>

            </View>
          )
        })}
      </ScrollView>
      <View style={{
        backgroundColor: '#409e31',
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 20,
      }}>
        <Text
          style={{ fontSize: 20, textAlign: 'center', marginVertical: 20 }}
          onPress={() => navigation.push('Search')}
        >
          Add new contact
        </Text>
      </View>
    </View>
  );

}

export default ContactsList;
