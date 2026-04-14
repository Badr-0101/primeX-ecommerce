import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import AuthSlice from '@store/authSlice';
const storage = createWebStorage('local');

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'favorites'],
};





const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;