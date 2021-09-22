import { createSlice } from '@reduxjs/toolkit'

const RoomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: [],
    showModal: { show: false, newRoom: false },
    modalData: [],
    photos: [],
    progress: 0,
    isOwner: false,
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload
    },
    setModalData: (state, action) => {
      state.modalData = action.payload
    },
    setProgress: (state, action) => {
      state.progress = action.payload
    },
    setPhotoUrl: (state, action) => {
      if (action.payload === true) {
        state.photos = []
      } else {
        state.photos = [...state.photos, action.payload]
      }
    },
    setOwner: (state, action) => {
      state.isOwner = action.payload
    },

  },
})
export const {
  setRooms,
  setShowModal,
  setModalData,
  setProgress,
  setPhotoUrl,
  setOwner,
} = RoomSlice.actions

export const stateSelector = (state) => state

export default RoomSlice.reducer
