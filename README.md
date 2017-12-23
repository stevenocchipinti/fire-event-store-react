# fire-event-store-react [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/stevenocchipinti/fire-event-store/master.svg?style=flat-square
[build]: https://travis-ci.org/stevenocchipinti/fire-event-store-react
[npm-badge]: https://img.shields.io/npm/v/fire-event-store-react.svg?style=flat-square
[npm]: https://www.npmjs.com/package/fire-event-store-react

This project is an experiment because I wanted to see if I could make a simple
API for using Firestore as an event store in an event sourcing application.

The concepts/technology I am playing with here are:
- Event Sourcing
- Firebase / Firestore
- CQRS / Message Bus (one component to write, another to read)
- React context (using `react-broadcast` for now, until it changes!!)
- HOC vs render props vs Function as Child Components

[`fire-event-store-react`](https://www.npmjs.com/package/fire-event-store-react)
provides two Function as Child Components:

1. `<FireEventStore>` does a few things:
  - Connects to Firebase and runs the documents at a given key through a reducer
  - Makes the resulting state from that reducer available to children
  - Puts a Firestore reference in context for `<EventEmitter>` components

2. `<EventEmitter>` only does one thing:
  - Sends a new event to Firebase

**Please note:** As with anything that uses
[context](https://reactjs.org/docs/context.html), this library and
`react-broadcast` which this library is based are both experimental.
Either of these may cease working in some future version of React.

## Installation

Using [yarn](https://yarnpkg.com/):

    $ yarn add fire-event-store-react

Then, use as you would anything else:

```js
// using ES6 modules
import { FireEventStore, EventEmitter } from "fire-event-store-react"

// using CommonJS modules
var FireEventStore = require("fire-event-store-react").FireEventStore
var EventEmitter = require("fire-event-store-react").EventEmitter
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/fire-event-store-react/umd/fire-event-store-react.min.js"></script>
```

You can find the library on `window.FireEventStoreReact`.
(Haven't actually tested this!)

## Usage

The following is a totally contrived example, but illustrates the basic
functionality we're after:

```js
import React from "react"
import {
  initializeApp,
  FireEventStore,
  EventEmitter
} from "fire-event-store-react"

// Setup the Firebase app
initializeApp({
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "..."
})

// Create a reducer
const initialState = { counter: 0 }
const reducer = (state = initialState, action) => {
  if (!action) return state
  switch (action.type) {
    case "INCREMENT":
      return { counter: state.counter + 1 }
    case "DECREMENT":
      return { counter: state.counter - 1 }
    default:
      return state
  }
}

// Use <FireEventStore /> around any component you want to be a container that
// is connected to the event stream, this could just be once at the top of the
// component tree and passed down via props
const App = props => (
  <FireEventStore
    stream="counter-events"                    // Any name for your event stream
    firebaseKey="counters/demo/counter-events" // Location of events in Firebase
    reducer={reducer}                          // The reducer from earlier
  >
    {state => (
      <div className="App">
        {/* Use the state as you normally would with this.state */}
        <div>{state.counter}</div>

        {/* Use the <EventEmitter /> component anywhere to emit a new event */}
        <EventEmitter stream="counter-events">
          {emit => (
            <div>
              <button
                className="button"
                onClick={() => emit({ type: "INCREMENT" })}
              >
                +
              </button>
              <button
                className="button"
                onClick={() => emit({ type: "DECREMENT" })}
              >
                -
              </button>
            </div>
          )}
        </EventEmitter>
      </div>
    )}
  </FireEventStore>
)
```

Enjoy!
