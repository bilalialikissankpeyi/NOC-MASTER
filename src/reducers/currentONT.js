const initialState = { current: null }

export const currentONTReducer = (state = initialState.current, action) => {
  switch (action.type) {
    case 'CURRENTONT':
      return (state = action.payload)
      break
    default:
      return state
  }
}
