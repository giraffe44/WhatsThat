import React, { useContext, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
const initialState = {
  isUserLoggedIn: true,
  userId: 1,
  userToken: 'ff4378cceda85c0480be8cd378a0aaae',
};

// const initialState = {
//   isUserLoggedIn: false,
//   userId: null,
//   userToken: null,
// };


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
      console.log('userLogin', payload, payload.userToken)
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
  const { userToken, userId, userLogout } = useContext(AuthContext);

  return (
    <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#ddd' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: '#333', fontSize: 20, marginLeft: 10 }} onPress={() => navigation.goBack()}> Back </Text>
      </View>
      {userId && <UserPhoto userId={userId} />}
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
    </View>
  )

}

const App = () => {
  return (
    <Provider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{
          header: ({navigation})=> <Header navigation={navigation} />
        }}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Your profile' }} />
          <Stack.Screen name="ContactsList" component={ContactsList} options={{ title: 'Start a new chat' }} />
          <Stack.Screen name="Search" component={Search} options={{ title: 'Find your friends' }} />
          <Stack.Screen name="ChatList" component={ChatList} options={{ title: 'Your chats' }} />
          <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
          <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ title: 'Upload Your Photo' }} />
          {/*
            <Stack.Screen name="BlockedUsers" component={BlockedUsers} options={{ title: 'Blocked contacts' }} />
          */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App; 
