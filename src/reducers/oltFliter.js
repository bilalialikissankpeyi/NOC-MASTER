const initialState = { current: '' }

export const oltFilterReducer = (state = initialState.current, action) => {
  switch (action.type) {
    case 'OLTFILTER':
      return (state = action.payload)
      break
    default:
      return state
  }
}
