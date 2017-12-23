import React from "react"
import { EventEmitter } from "fire-event-store-react"

const ControlPanel = props => (
  <EventEmitter stream="counter-events">
    {emit => (
      <div>
        <button className="button" onClick={() => emit({ type: "INCREMENT" })}>
          +
        </button>
        <button className="button" onClick={() => emit({ type: "DECREMENT" })}>
          -
        </button>
      </div>
    )}
  </EventEmitter>
)

export default ControlPanel
