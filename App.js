import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ContactsList from './components/ContactsList';
import Search from './components/Search';
import ChatList from './components/ChatList';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['http://localhost:19006/'],
  config: {
    screens: {
      Login: '',
      Signup: '/Signup',
      Profile: '/Profile',
      ContactsList: '/ContactsList',
      Search: '/Search',
      ChatList: '/ChatList',
      Chat: '/Chat/:chatId',
    }
  },
};

const AuthContext = createContext(null);
export { AuthContext };

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    userId: 1,
    token: ''
  });


  return (
    <AuthContext.Provider value={currentUser} setCurrentUser={setCurrentUser}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{
          header: ({ navigation }) => (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#ddd' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: '#333', fontSize: 20, marginLeft: 10 }} onPress={() => navigation.goBack()}> Back </Text>
              </View>
            </View>
          )
        }}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Your profile' }} />
          <Stack.Screen name="ContactsList" component={ContactsList} options={{ title: 'Start a new chat' }} />
          <Stack.Screen name="Search" component={Search} options={{ title: 'Find your friends' }} />
          <Stack.Screen name="ChatList" component={ChatList} options={{ title: 'Your chats' }} />
          <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
          {/*
            <Stack.Screen name="BlockedUsers" component={BlockedUsers} options={{ title: 'Blocked contacts' }} />
          */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App; 
