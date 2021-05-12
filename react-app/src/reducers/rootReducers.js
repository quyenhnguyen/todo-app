import { combineReducers } from 'redux'
import todosReducers from './todosReducers'
import loginReducers from './loginReducer'
import registerReducer from './registerReducer'

const rootReducer = combineReducers({
  todosReducers,
  loginReducers,
  registerReducer,
})

export default rootReducer
