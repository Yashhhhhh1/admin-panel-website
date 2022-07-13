import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './Redux/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './Redux/Reducer';
import thunk from 'redux-thunk';
import reducer from './Redux/FetchData/fetchReducers';


const masterReducer = {
  reducer : Reducer,
  fetchReducer : reducer 
}

const store = configureStore({reducer : masterReducer,
  devTools : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  middleware: [thunk]
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
