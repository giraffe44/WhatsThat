import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../App';
import { CHAT_LISTS, CREATE_CHAT } from '../config';

const ChatList = ({navigation}) => {
  const [chats, setChats] = useState([])
  const [newChatTopic, setNewChatTopic] = useState('')  
  const {userToken} = useContext(AuthContext);
  const state = useContext(AuthContext);

  useEffect(() => {
    fetch(CHAT_LISTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.json())
      .then(chats => {
        setChats(chats)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View>
      {chats.map((chat) => {
        return (
          <View key={chat.chat_id}>
            <Button title={`Open ${chat.name}`} onPress={() => {
              // Verify on mobile if { chatId: chat.chat_id } is needed instead of url param
              // navigation.navigate(`Chat/${chat.chat_id}`)
              navigation.navigate(`Chat`, { chatId: chat.chat_id })
            }} />
          </View>
        )
      })}
      <Text
        onPress={() => navigation.goBack()}
      >
        Go back
      </Text>


      <View>
        <TextInput
          placeholder="New chat topic"
          onChangeText={(text) => { setNewChatTopic(text) }} value={newChatTopic}
        />
        <Button
          disabled={!newChatTopic}
          title={`Start a new chat`} onPress={() => {
            fetch(CREATE_CHAT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
              },
              body: JSON.stringify({
                name: newChatTopic
              })
            })
              // Server just replies OK 200
              .then(data => {
                // chat_id
                console.log(data)
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }} />

      </View>
    </View>
  );

}

export default ChatList;
