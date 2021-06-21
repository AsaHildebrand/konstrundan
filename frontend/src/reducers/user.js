import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
    userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    errors: null,
    resolvedKarlstad: [],
    resolvedUppsala: []
  }
  : {
    userId: null,
    username: null,
    accessToken: null,
    errors: null,
    resolvedKarlstad: [],
    resolvedUppsala: []
  }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setResolvedKarlstad: (store, action) => {
      store.resolvedKarlstad = action.payload
    },
    setResolvedUppsala: (store, action) => {
      store.resolvedUppsala = action.payload
    }
  }
})

export default user