import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

// Redux persist is basically used to store the state/data of the app in the local storage of the browser.
// Means that the state of the app is not lost when the app is refreshed or closed.
// the only way to remove the state is to clear the local storage/cache of the browser
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
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = { key :'root', storage, version:1};  // the below is just the code from redux persist documentation(no logic is used here)
const persistedReducer = persistReducer(persistConfig,authReducer);
const store= configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{
      ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    },
  }),
});

// the below is configuration of redux persist(no logic is used here)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>  
    <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


