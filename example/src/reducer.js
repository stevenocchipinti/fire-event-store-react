const initialState = { counter: 0 }

const reducer = (state=initialState, action) => {
  if (!action) return state
  switch (action.type) {
    case "INCREMENT": return { counter: state.counter + 1 }
    case "DECREMENT": return { counter: state.counter - 1 }
    default: return state
  }
}

export default reducer
