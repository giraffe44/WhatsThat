export const CREATE_USER = 'http://localhost:3333/api/1.0.0/user'
export const GET_USER = (userId) => `http://localhost:3333/api/1.0.0/user/${userId}`
export const UPDATE_USER = (userId) => `http://localhost:3333/api/1.0.0/user/${userId}`
export const LOGIN = 'http://localhost:3333/api/1.0.0/login'
export const LOGOUT = 'http://localhost:3333/api/1.0.0/logout'
export const GET_USER_PHOTO = (userId)=> `http://localhost:3333/api/1.0.0/user/${userId}/photo/`
export const UPDATE_USER_PHOTO = (userId)=> `http://localhost:3333/api/1.0.0/user/${userId}/photo/`
export const SEARCH_USERS = (searchStr) => `http://localhost:3333/api/1.0.0/search?q=${searchStr}`

export const GET_CONTACTS = 'http://localhost:3333/api/1.0.0/contacts'
export const ADD_CONTACT = (userId)=>`http://localhost:3333/api/1.0.0/user/${userId}/contact`
// export const REMOVE_CONTACT = 'http://localhost:3333/api/1.0.0/user/' // + user_id + /contact
// export const GET_BLOCKED_CONTACTS = 'http://localhost:3333/api/1.0.0/blocked'
// export const BLOCK_CONTACT = 'http://localhost:3333/api/1.0.0/user/' // + user_id + /block
// export const UNBLOCK_CONTACT = 'http://localhost:3333/api/1.0.0/user/' // + user_id + /block

export const CHAT_LISTS = 'http://localhost:3333/api/1.0.0/chat'
export const CREATE_CHAT = 'http://localhost:3333/api/1.0.0/chat'
export const GET_CHAT = (chatId) => `http://localhost:3333/api/1.0.0/chat/${chatId}`

// export const UPDATE_CHAT = 'http://localhost:3333/api/1.0.0/chat/' // + chat_id
// export const ADD_USER_TO_CHAT = 'http://localhost:3333/api/1.0.0/chat/' // + chat_id + /user
// export const REMOVE_USER_FROM_CHAT = 'http://localhost:3333/api/1.0.0/chat/' // + chat_id + /user
export const SEND_MESSAGE = (chatId) => `http://localhost:3333/api/1.0.0/chat/${chatId}/message` // + chat_id + /message
// export const UPDATE_MESSAGE = 'http://localhost:3333/api/1.0.0/chat/' // + chat_id + /message
// export const DELETE_MESSAGE = 'http://localhost:3333/api/1.0.0/chat/' // + chat_id + /message