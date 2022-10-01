import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { dietSlice } from '../Features/Diets/Store/Diet'
import { authSlice } from './Login';

const authPersistConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  whitelist: ['credentials']
}
const reducers = combineReducers({
  authentication: persistReducer(authPersistConfig, authSlice.reducer),
  diets: dietSlice.reducer
})

const persistedReducer = reducers

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false
    })

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }
    return middlewares
  },
})

const persistor = persistStore(store, { })

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor }
