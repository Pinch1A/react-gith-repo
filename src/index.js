import './index.css'
import * as serviceWorker from './serviceWorker'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import repoReducer from './store/reducers/reposPage'
import thunk from 'redux-thunk'
import tokenReducer from './store/reducers/tokenValidator'

const composeEnhancers = (t) =>
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose

const rootReducer = combineReducers({
  tokenValidator: tokenReducer,
  repoReducer: repoReducer,
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
