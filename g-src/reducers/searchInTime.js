import { getSearched } from '../dataService/getSearchInformations.js'
import { searchUserCollectionInTime } from '../actions'
const initialState = { search: null }

export const searchInTimeReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case 'SEARCHINTIME':
      return (state = action.payload)
      break
    default:
      return state
  }
}

export const loadSearchInTimeData = (value) => async (dispatch, getState) => {
  var data = await getSearched(
    value.collection,
    {
      ObjectName: value.ObjectName,
      startdate: value.startdate,
      enddate: value.enddate,
    },
    'getUserRecordsInTime'
  )
  console.log('SearchINTime', data)
  dispatch(searchUserCollectionInTime(data))
}
