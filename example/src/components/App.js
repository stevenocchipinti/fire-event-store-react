import React from "react"
import logo from "../logo.svg"
import { FireEventStore } from "fire-event-store-react"
import reducer from "../reducer"
import Counter from "./Counter"
import ControlPanel from "./ControlPanel"

const App = props => (
  <FireEventStore
    stream="counter-events"
    firebaseKey="counters/demo/counter-events"
    reducer={reducer}
  >
    {state => (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to fire-event-store-react</h1>
        </header>

        <Counter value={state.counter} />
        <ControlPanel />
      </div>
    )}
  </FireEventStore>
)

export default App
