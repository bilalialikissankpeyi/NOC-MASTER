const initialState = { current: null }

export const currentOLTReducer = (state = initialState.current, action) => {
  switch (action.type) {
    case 'CURRENTOLT':
      return (state = action.payload)
      break
    default:
      return state
  }
}
