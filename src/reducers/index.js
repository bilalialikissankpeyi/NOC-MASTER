import { searchReducer } from './searched'
import { searchInTimeReducer } from './searchInTime'
import { currentONTReducer } from './currentONT'
import { currentOLTReducer } from './currentOLT'
import { combineReducers } from 'redux'

const allReducer = combineReducers({
  searched: searchReducer,
  searchInTime: searchInTimeReducer,
  currentOLT: currentOLTReducer,
  currentONT: currentONTReducer,
})
export default allReducer
