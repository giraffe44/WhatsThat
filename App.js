import React, { useContext, createContext } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button } from 'react-native';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ContactsList from './components/ContactsList';
import Search from './components/Search';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import UserPhoto from './components/UserPhoto';
import UploadPhoto from './components/UploadPhoto';
import { LOGOUT } from './config';

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
      UploadPhoto: '/UploadPhoto',
    }
  },
};

const AuthContext = createContext(null);
export { AuthContext };

//Initial State and Actions
// const initialState = {
//   isUserLoggedIn: true,
//   userId: 2,
//   userToken: '3eebf0a3e0a88c5432911a3dbb0bd1df',
// };

const initialState = {
  isUserLoggedIn: false,
  userId: null,
  userToken: null,
};


const actions = {
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.USER_LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
        userId: null,
        userToken: null,
      };
    case actions.USER_LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        userId: action.payload.userId,
        userToken: action.payload.userToken,
      };
    default:
      return state;
  }
};


const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    ...state,
    userLogin: (payload) => {
      dispatch({ type: actions.USER_LOGIN, payload });
    },
    userLogout: () => {
      dispatch({ type: actions.USER_LOGOUT });
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const Header = ({ navigation }) => {
  const { userToken, userId, isUserLoggedIn, userLogout } = useContext(AuthContext);
  const route = useRoute();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, backgroundColor: '#ddd' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: '#333', fontSize: 20, marginLeft: 10 }} onPress={() => navigation.goBack()}> Back </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', fontSize: 20 }}>
        <Text>{route.name}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View>
          {userId && <UserPhoto userId={userId} navigation={navigation} />}
        </View>
        <View>
          {isUserLoggedIn && (
            <Button color={'#999'} title="LogOut" onPress={() => {
              fetch(LOGOUT, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Authorization': userToken
                },
              })
                .then(() => {
                  userLogout()
                  navigation.push('Login')
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const App = () => {
  return (
    <Provider>
      <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#eee' }}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />
          }}>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Your profile' }} />
            <Stack.Screen name="ContactsList" component={ContactsList} options={{ title: 'Add user to a chat' }} />
            <Stack.Screen name="Search" component={Search} options={{ title: 'Find your friends' }} />
            <Stack.Screen name="ChatList" component={ChatList} options={{ title: 'Your chats' }} />
            <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
            <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ title: 'Upload Your Photo' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App; 
