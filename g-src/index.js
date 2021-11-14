import React from 'react'
import ReactDOM from 'react-dom'

import reportWebVitals from './reportWebVitals'
import Layout from './components/layout/Layout'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import allReducer from './reducers'

const store = createStore(allReducer, applyMiddleware(thunk))
document.title = 'Noc CMS'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
