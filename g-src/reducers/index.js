import { searchReducer } from './searched'
import { searchInTimeReducer } from './searchInTime'
import { currentONTReducer } from './currentONT'
import { currentOLTReducer } from './currentOLT'
import { combineReducers } from 'redux'
import { oltFilterReducer } from './oltFliter'
import { ontFilterReducer } from './ontFliter'
const allReducer = combineReducers({
  searched: searchReducer,
  searchInTime: searchInTimeReducer,
  currentOLT: currentOLTReducer,
  currentONT: currentONTReducer,
  oltFilter: oltFilterReducer,
  ontFilter: ontFilterReducer,
})
export default allReducer
