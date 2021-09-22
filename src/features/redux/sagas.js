import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { storage } from '../../firebase/firebaseConfig'
import client from '../../utils/client'
import {
  ADD_ROOM,
  DELETE,
  DELETE_ROOM,
  FETCH_ROOMS,
  GET,
  PATCH,
  POST,
  PUT,
  SIGN_IN,
  SIGN_UP,
  UPDATE_ROOM,
  UPLOAD_IMAGE,
} from '../../utils/constants'
import { saveToStorage } from '../../utils/Storage'
import {
  setModalData,
  setPhotoUrl,
  setProgress,
  setRooms,
  setShowModal,
} from './slicers'

function* fetchRooms(payload) {
  try {
    const data = {
      url: '/room/getRooms',
      configs: { method: GET },
    }
    const response = yield call(apiCall, data)
    yield put(setRooms(response))
  } catch (error) {
    console.log(error)
  }
}

function* deleteRoom(payload) {
  try {
    const data = {
      url: '/room/deleteRoom',
      configs: {
        method: DELETE,
        data: payload.data,
      },
    }
    yield call(apiCall, data)
  } catch (error) {
    console.log(error)
  }
}
function* uploadImageToFirebase(payload) {
  try {
    if (payload.image) {
      Array.from(payload.image).forEach((image, idx) => {
        const storageRef = ref(storage, image.name)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
          'state_changed',
          (snap) => {
            let uploadProgress = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            payload.dispatch(setProgress(uploadProgress))
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((imageUrl) => {
                payload.dispatch(setPhotoUrl(imageUrl))
              })
              .catch((error) => console.log(error))
          }
        )
      })
    }
  } catch (error) {
    yield call(console.log, error)
  }
}

function* addRoom(payload) {
  console.log(payload)
  try {
    const data = {
      url: '/room/addRoom',
      configs: {
        method: PUT,
        data: payload.data,
      },
    }
    yield call(apiCall, data)
    yield cleanUp()
  } catch (error) {
    console.log(error)
  }
}

function* updateRoom(payload) {
  try {
    const data = {
      url: '/room/updateRoom',
      configs: {
        method: PATCH,
        data: payload.data,
      },
    }
    yield call(apiCall, data)
    yield cleanUp()
  } catch (error) {
    console.log(error)
  }
}

function* signUp(payload) {
  try {
    const data = {
      url: '/user/signUpUser',
      configs: {
        method: PUT,
        data: payload.userData,
      },
    }
    const response = yield call(apiCall, data)
    saveToStorage('user', response.user)
    saveToStorage('token', response.token)
    payload.navigateToHome()
  } catch (error) {
    yield console.log(error.response.data.message)
  }
}
function* signIn(payload) {
  try {
    const data = {
      url: '/user/loginUser',
      configs: {
        method: POST,
        data: payload.user,
      },
    }
    const response = yield call(apiCall, data)
    saveToStorage('user', response.user)
    saveToStorage('token', response.token)
    if (response.user.isOwner) {
      payload.history.push('/owner/home')
    } else {
      payload.history.push('/user/home')
    }
  } catch (error) {
    console.log(error.response.data.message)
  }
}
function apiCall(payload) {
  return client(payload.url, payload.configs)
}
function* roomsWatcher() {
  yield takeLatest(FETCH_ROOMS, fetchRooms)
  yield takeLatest(DELETE_ROOM, deleteRoom)
  yield takeLatest(UPLOAD_IMAGE, uploadImageToFirebase)
  yield takeLatest(UPDATE_ROOM, updateRoom)
  yield takeLatest(ADD_ROOM, addRoom)
}

function* cleanUp() {
  yield put(setShowModal({ show: false }))
  yield put(setProgress(0))
  yield call(fetchRooms)
  yield put(setPhotoUrl(true))
  yield put(setModalData([]))
}

function* userWatcher() {
  yield takeLatest(SIGN_UP, signUp)
  yield takeLatest(SIGN_IN, signIn)
}

export default function* rootSaga() {
  yield all([roomsWatcher(), userWatcher()])
}
