import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../App.js'
import { GET_CHAT, SEND_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, UPDATE_CHAT, REMOVE_USER_FROM_CHAT } from '../config.js';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ navigation }) => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState({})
  const [showChatUsers, setShowChatUsers] = useState(false)

  const { userToken, userId } = useContext(AuthContext);

  const route = useRoute();
  const chatId = route.params.chatId

  const storeData = async (message) => {
    try {
      // Save every chat message to local storage using chatId as key
      // Using chatId as key allows us to have multiple chat messages stored
      await AsyncStorage.setItem('@chatMessage:'+chatId, message)
    } catch (e) {
      // saving error
    }
  }

  const sendMessage = () => {
    fetch(SEND_MESSAGE(chatId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
      body: JSON.stringify({
        message: message
      })
    })
      // Server just replies OK 200
      .then(() => {
        setMessage('')
        storeData('')
        fetchMessages()
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@chatMessage:'+chatId)
        if(value !== null) {
          setMessage(value)
        }
      } catch(e) {
        // error reading value
      }
    }

    getData()
  }, [])

  const fetchMessages = async () => {
    if (!chatId) return

    fetch(GET_CHAT(chatId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
    })
      .then(response => response.json())
      .then(chat => {
        // console.log(chat)
        setChat(chat)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    fetchMessages()
  }, []);

  if (!chatId) {
    return <View><Text>Missing Chat ID, wrong link?</Text></View>
  }

  if (!chat.name) {
    return <View><Text>Loading</Text></View>
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 3, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}
            value={chat.name} onChangeText={(newChatName) => {
              fetch(UPDATE_CHAT(chatId), {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': userToken
                },
                body: JSON.stringify({
                  name: newChatName
                })
              })
                // Server just replies OK 200
                .then(() => {
                  fetchMessages()
                  // console.log(data)
                })
                .catch(error => {
                  console.error('Error 4:', error);
                });
            }} />
        </View>

        <View style={{ margin: 6, flexDirection: 'row' }}>
          <TouchableOpacity style={{marginRight: 10}} onPress={() => {
            setShowChatUsers(!showChatUsers)
          }}>
            <AntDesign name="minuscircleo" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate(`ContactsList`, { chatId: chatId })
          }}>
            <AntDesign name="pluscircleo" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {showChatUsers && (
        <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 3, flexDirection: 'row' }}>
          {chat.members.map((member) => (
            <View key={member.user_id} style={{ margin: 6, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16 }}>{member.first_name} {member.last_name}</Text>
              <TouchableOpacity onPress={() => {
                fetch(REMOVE_USER_FROM_CHAT(chatId, member.user_id), {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken
                  }
              })
                .then(()=>{
                  fetchMessages()
                })
                .catch(error => {
                  console.error('Error:', error);
                });
              }}>
                <AntDesign name="delete" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <ScrollView style={{ flex: 1, marginHorizontal: 20, }}>
        {chat.messages.map((message) => (
          <View key={message.message_id} style={{ marginVertical: 10 }}>
            {message.author.user_id !== userId && (
              <Text>{message.author.first_name}: {message.message}</Text>
            )}
            {message.author.user_id === userId && (
              <TextInput value={message.message} onChangeText={(newMessage) => {
                fetch(UPDATE_MESSAGE(chatId, message.message_id), {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken
                  },
                  body: JSON.stringify({
                    message: newMessage
                  })
                })
                  // Server just replies OK 200
                  .then(() => {
                    fetchMessages()
                  })
                  .catch(error => {
                    console.error('Error 4:', error);
                  });
              }} />
            )}

            {message.author.user_id === userId && (
              <TouchableOpacity onPress={() => {
                fetch(DELETE_MESSAGE(chatId, message.message_id), {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userToken
                  },
                  body: JSON.stringify({
                    message: message
                  })
                })
                  // Server just replies OK 200
                  .then(() => {
                    fetchMessages()
                  })
                  .catch(error => {
                    console.error('Error 2:', error)
                  });
              }}>
                <AntDesign name="delete" size={24} color="#ccc" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={{
        backgroundColor: '#409e31',
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 20,
      }}>
        <TextInput
          style={{ color: 'white', fontSize: 16, textAlign: 'left' }}
          placeholderTextColor="#ddd"
          placeholder="Type here..."
          onChangeText={(text) => {
            setMessage(text)
            storeData(text)
          }}
          value={message}
        />

        <Button disabled={!message} title={`Send message`} onPress={() => {
          sendMessage()
        }} />

      <TextInput
        placeholder="Your message"
        onChangeText={(text) => { setMessage(text) }}
        value={message}
      />

      <Button disabled={!message} title={`Send message`} onPress={() => {
        fetch(SEND_MESSAGE(chatId), {
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
    </View>
  );

}

export default Chat;
