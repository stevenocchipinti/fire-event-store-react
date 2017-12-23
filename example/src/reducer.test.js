import reducer from './reducer';

it('has an initialState with a count of 0', () => {
  expect(reducer()).toMatchObject({ counter: 0 })
});

const initialState = reducer()

it('adds 1 to the counter upon an INCREMENT action', () => {
  const action = { type: "INCREMENT" }
  expect(reducer(initialState, action)).toMatchObject({ counter: 1 })
});

it('subtracts 1 from the counter upon an DECREMENT action', () => {
  const action = { type: "DECREMENT" }
  expect(reducer(initialState, action)).toMatchObject({ counter: -1 })
});

it('can reduce many actions using Array.reduce', () => {
  const actions = [
    { type: "DECREMENT" },  // -1
    { type: "DECREMENT" },  // -2
    { type: "INCREMENT" },  // -1
    { type: "INCREMENT" },  // 0
    { type: "INCREMENT" },  // 1
    { type: "DECREMENT" },  // 0
    { type: "INCREMENT" },  // 1
    { type: "INCREMENT" },  // 2
  ]
  expect(actions.reduce(reducer, initialState)).toMatchObject({ counter: 2 })
})
