import React from "react"
import ReactDOM from "react-dom"
import { initializeApp } from "fire-event-store-react"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"

initializeApp({
  apiKey: "AIzaSyAfu0kXXviAaCCl2j8DTwBDlkANNZKkdkw",
  authDomain: "fire-event-store-demo.firebaseapp.com",
  databaseURL: "https://fire-event-store-demo.firebaseio.com",
  projectId: "fire-event-store-demo",
  storageBucket: "fire-event-store-demo.appspot.com",
  messagingSenderId: "932085506803"
})

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
