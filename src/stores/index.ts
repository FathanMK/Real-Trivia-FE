import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from './slices/user';
import themeReducer from './slices/theme';
import savedUserReducer from './slices/savedUser';

import { userApi } from './services/user';
import { matchApi } from './services/match';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
  savedUser: savedUserReducer,
  [userApi.reducerPath]: userApi.reducer,
  [matchApi.reducerPath]: matchApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, matchApi.middleware),
});

export const persistor = persistStore(store);
