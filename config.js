const serverUrl = `http://localhost:3333`
// const serverUrl = 'http://192.168.1.50:3333'

export const CREATE_USER = `${serverUrl}/api/1.0.0/user`
export const GET_USER = (userId) => `${serverUrl}/api/1.0.0/user/${userId}`
export const UPDATE_USER = (userId) => `${serverUrl}/api/1.0.0/user/${userId}`
export const LOGIN = `${serverUrl}/api/1.0.0/login`
export const LOGOUT = `${serverUrl}/api/1.0.0/logout`
export const GET_USER_PHOTO = (userId)=> `${serverUrl}/api/1.0.0/user/${userId}/photo/`
export const UPDATE_USER_PHOTO = (userId)=> `${serverUrl}/api/1.0.0/user/${userId}/photo/`
export const SEARCH_USERS = (searchStr) => `${serverUrl}/api/1.0.0/search?q=${searchStr}`

export const GET_CONTACTS = `${serverUrl}/api/1.0.0/contacts`
export const ADD_CONTACT = (userId)=>`${serverUrl}/api/1.0.0/user/${userId}/contact`
export const REMOVE_CONTACT =  (userId)=>`${serverUrl}/api/1.0.0/user/${userId}/contact`
export const GET_BLOCKED_CONTACTS = `${serverUrl}/api/1.0.0/blocked`
export const BLOCK_CONTACT =  (userId)=>`${serverUrl}/api/1.0.0/user/${userId}/block`
export const UNBLOCK_CONTACT = (userId)=>`${serverUrl}/api/1.0.0/user/${userId}/block`

export const CHAT_LISTS = `${serverUrl}/api/1.0.0/chat`
export const CREATE_CHAT = `${serverUrl}/api/1.0.0/chat`
export const GET_CHAT = (chatId) => `${serverUrl}/api/1.0.0/chat/${chatId}`

export const UPDATE_CHAT = (chatId) => `${serverUrl}/api/1.0.0/chat/${chatId}`
export const ADD_USER_TO_CHAT = (chatId, userId) =>  `${serverUrl}/api/1.0.0/chat/${chatId}/user/${userId}`
export const REMOVE_USER_FROM_CHAT = (chatId, userId) =>  `${serverUrl}/api/1.0.0/chat/${chatId}/user/${userId}` 
export const SEND_MESSAGE = (chatId) => `${serverUrl}/api/1.0.0/chat/${chatId}/message`
export const UPDATE_MESSAGE = (chatId, messageId)=>`${serverUrl}/api/1.0.0/chat/${chatId}/message/${messageId}` 
export const DELETE_MESSAGE = (chatId, messageId)=>`${serverUrl}/api/1.0.0/chat/${chatId}/message/${messageId}` 