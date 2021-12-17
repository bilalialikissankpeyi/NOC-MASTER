import { getSearched } from '../dataService/getSearchInformations.js'
import { search } from '../actions'
const initialState = { search: null }

export const searchReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case 'SEARCH':
      return (state = action.payload)
      break
    default:
      return state
  }
}

export const loadData = (value) => async (dispatch, getState) => {
  var data = await getSearched(
    'ONT_INFO',
    { serialNumber: value },
    'getUserCollection'
  )
  console.log('data', data)
  dispatch(search(data))
}
/*.then((res) => {
    console.log('res', res)
  })*/
