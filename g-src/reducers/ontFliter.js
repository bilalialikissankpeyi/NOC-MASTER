const initialState = { current: '' }

export const ontFilterReducer = (state = initialState.current, action) => {
  switch (action.type) {
    case 'ONTFILTER':
      return (state = action.payload)
      break
    default:
      return state
  }
}
