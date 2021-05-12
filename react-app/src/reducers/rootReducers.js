import { combineReducers } from 'redux'
import todosReducers from './todosReducers'
import loginReducer from './loginReducer'
import registerReducer from './registerReducer'

const rootReducer = combineReducers({
  todosReducers,
  loginReducer,
  registerReducer,
})

export default rootReducer
