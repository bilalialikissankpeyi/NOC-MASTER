import {
  getSearched,
  getLastData,
} from '../dataService/getSearchInformations.js'
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

  getLastData({
    typeofSearch: 'getUserLastData',
    collection: 'ISAM_ONT',
    ObjectName: data.ObjectName,
    start: new Date('11 December 2021 23:00 UTC').toISOString(),
    end: new Date('11 December 2021 23:00 UTC').toISOString(),
    olt: data.ObjectName.split(':')[0],
  }).then((element) => {
    console.log('dataaaa', element)
    element[0].data.map((value) => {
      console.log('data', value)
      console.log('data', data)
      data['interface Administration Status'] =
        value['interface Administration Status']
      data['interface Operation Status'] = value['interface Operation Status']
      data['timestamp'] = new Date(value['timestamp'])
      dispatch(search(data))
    })
  })
}
/*.then((res) => {
    console.log('res', res)
  })*/
