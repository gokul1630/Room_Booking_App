import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './slicers'
import rootSaga from './sagas'

const sagaMiddleWare = createSagaMiddleware()
const rootStore = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleWare],
})
sagaMiddleWare.run(rootSaga)
export default rootStore
