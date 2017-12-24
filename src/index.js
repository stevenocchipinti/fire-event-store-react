import React, { Component } from "react"
import Firebase from "firebase"
import "firebase/firestore"
import { Broadcast, Subscriber } from "react-broadcast"

export function initializeApp(config) {
  Firebase.initializeApp({
    apiKey: "AIzaSyAfu0kXXviAaCCl2j8DTwBDlkANNZKkdkw",
    authDomain: "fire-event-store-demo.firebaseapp.com",
    databaseURL: "https://fire-event-store-demo.firebaseio.com",
    projectId: "fire-event-store-demo",
    storageBucket: "fire-event-store-demo.appspot.com",
    messagingSenderId: "932085506803"
  })
}

export class FireEventStore extends Component {
  constructor(props) {
    super(props)
    const { firebaseKey, reducer } = props
    this.state = reducer()
    Firebase.firestore().collection(firebaseKey).onSnapshot(snapshot => {
      this.setState(
        snapshot.docChanges
          .filter(c => c.type === "added")
          .map(e => e.doc.data())
          .reduce(reducer, this.state)
      )
    })
  }

  eventEmitter() {
    return event => (
      Firebase.firestore().collection(this.props.firebaseKey).add({
        ...event,
        timestamp: Firebase.firestore.FieldValue.serverTimestamp()
      })
    )
  }

  render() {
    const { stream, children: render } = this.props
    return (
      <Broadcast channel={stream} value={this.eventEmitter()}>
        {render(this.state)}
      </Broadcast>
    )
  }
}

export class EventEmitter extends Component {
  render() {
    const { stream, children: render } = this.props
    return <Subscriber channel={stream}>{emit => render(emit)}</Subscriber>
  }
}
