import '../styles/globals.css'

import {createStore , compose, applyMiddleware, combineReducers } from 'redux'
import { Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'

import authReducer from '../stores/reducers/auth'
import postReducer from '../stores/reducers/post'

const composeEnhancers = compose;
const rootReducer = combineReducers({
  auth : authReducer,
  post : postReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)))

function MyApp({ Component, pageProps }) {
  return <Provider store={store}> <Component {...pageProps} /> </Provider>
}

export default MyApp
