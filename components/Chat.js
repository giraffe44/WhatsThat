import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../App.js'


const Chat = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState({})
  
  const {token} = useContext(AuthContext);

  const route = useRoute();
  const chatId = route.params.chatId

  useEffect(() => {
    fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
    })
      .then(response => response.json())
      .then(chat => {
        console.log(chat)
        setChat(chat)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (!chat.name) {
    return <View><Text>Loading</Text></View>
  }

  return (
    <View>
      <Text>{chat.name}</Text>

      <View style={{marginVertical: 20}}>
        {chat.messages.map((message) => (
          <View key={message.message_id}>
            <Text> > {message.message} ({message.author.first_name})</Text>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Your message"
        onChangeText={(text) => { setMessage(text) }}
        value={message}
      />

      <Button disabled={!message} title={`Send message`} onPress={() => {
        fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
          },
          body: JSON.stringify({
            message: message
          })
        })
          // Server just replies OK 200
          .then(data => {
            // console.log(data)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }} />

    </View>
  );

}

export default Chat;
