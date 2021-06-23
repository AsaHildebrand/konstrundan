import { createSlice } from '@reduxjs/toolkit'

const artwork = createSlice({
  name: 'artwork',
  initialState: {
    selectedArtwork: null,
    artworkId: null,
    newAnswer: null
  },
  reducers: {
    setArtworkId: (store, action) => {
      store.artworkId = action.payload
    },
    setSelectedArtwork: (store, action) => {
      store.selectedArtwork = action.payload
    },
    setNewAnswer: (store, action) => {
      store.newAnswer = action.payload
    }
  }
})

export default artwork