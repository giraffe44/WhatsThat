import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../App';
import { CHAT_LISTS, CREATE_CHAT } from '../config';

import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const [newChatTopic, setNewChatTopic] = useState('')
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if (newChatTopic !== '') return

    fetch(CHAT_LISTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.json())
      .then(chats => {
        setChats(chats.reverse())
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [newChatTopic]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginHorizontal: 20, }}>
        {chats.map((chat) => {
          return (
            <TouchableOpacity key={chat.chat_id} onPress={() => {
              navigation.navigate(`Chat`, { chatId: chat.chat_id })
            }}>
              <View style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
                <View style={{ flexDirection: 'column', width: 300}}>
                  <Text style={{fontSize: 16}}>{chat.name}</Text>
                  {!!chat.last_message && <Text style={{color: '#555', fontStyle: 'italic'}}>{chat.last_message?.message}</Text>}
                </View>
                <View style={{ width: 30 }}>
                <SimpleLineIcons name="book-open" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{
        backgroundColor: '#409e31',
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TextInput
          style={{color:'white', fontSize: 16, textAlign: 'center'}}
          placeholderTextColor="#ddd" 
          placeholder="Choose a new chat topic"
          onChangeText={(text) => { setNewChatTopic(text) }} value={newChatTopic}
        />
        <View style={{height: 50, width: 50}}>
          <TouchableOpacity onPress={() => {
            fetch(CREATE_CHAT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userToken
              },
              body: JSON.stringify({
                name: newChatTopic
              })
            })
              // Server just replies OK 200
              .then(() => {
                setNewChatTopic('')
                // chat_id
                // console.log(data)
              })
              .catch(error => {
                console.log('Error:', error);
              });
          }}>
          {!!newChatTopic && <MaterialIcons name="create" size={50} color="white" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}

export default ChatList;
