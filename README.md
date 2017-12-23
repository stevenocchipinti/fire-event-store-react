# fire-event-store-react [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/stevenocchipinti/fire-event-store/master.svg?style=flat-square
[build]: https://travis-ci.org/stevenocchipinti/fire-event-store-react
[npm-badge]: https://img.shields.io/npm/v/fire-event-store-react.svg?style=flat-square
[npm]: https://www.npmjs.com/package/fire-event-store-react

[`fire-event-store-react`](https://www.npmjs.com/package/fire-event-store-react)
provides a reliable way ...

**Please note:** As with anything that uses
[context](https://reactjs.org/docs/context.html), this library is experimental.
It may cease working in some future version of React. For now, it's a practical
workaround for the router. If we discover some better way to do things in the
future, rest assured we'll do our best to share what we learn.

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

## Usage

The following is a totally contrived example, but illustrates the basic
functionality we're after:

```js
import React from "react"
import { FireEventStore, EventEmitter } from "fire-event-store-react"

// const users = [{ name: "Michael Jackson" }, { name: "Ryan Florence" }]
//
// class UpdateBlocker extends React.Component {
//   shouldComponentUpdate() {
//     // This is how you indicate to React's reconciler that you don't
//     // need to be updated. It's a great way to boost performance when
//     // you're sure (based on your props and state) that your render
//     // output will not change, but it makes it difficult for libraries
//     // to communicate changes down the hierarchy that you don't really
//     // know anything about.
//     return false
//   }
//
//   render() {
//     return this.props.children
//   }
// }
//
// class App extends React.Component {
//   state = {
//     currentUser: users[0]
//   }
//
//   componentDidMount() {
//     // Randomly change the current user every 2 seconds.
//     setInterval(() => {
//       const index = Math.floor(Math.random() * users.length)
//       this.setState({ currentUser: users[index] })
//     }, 2000)
//   }
//
//   render() {
//     return (
//       <Broadcast channel="currentUser" value={this.state.currentUser}>
//         <UpdateBlocker>
//           <Subscriber channel="currentUser">
//             {currentUser => <p>The current user is {currentUser.name}</p>}
//           </Subscriber>
//         </UpdateBlocker>
//       </Broadcast>
//     )
//   }
// }
```

By default `<Broadcast value>` values are compared using the `===` (strict
equality) operator. To change this behavior, use `<Broadcast compareValues>`
which is a function that takes the `prevValue` and `nextValue` and compares
them. If `compareValues` returns `true`, no re-render will occur.

You may prefer to wrap these components into channel-specific pairs to avoid
typos and other problems with the indirection involved with the channel strings:

```js
//// Broadcasts.js
//import { Broadcast, Subscriber } from 'react-broadcast'
//
//const CurrentUserChannel = 'currentUser'
//
//export const CurrentUserBroadcast = (props) =>
//  <Broadcast {...props} channel={CurrentUserChannel} />
//
//export const CurrentUserSubscriber = (props) =>
//  <Subscriber {...props} channel={CurrentUserChannel} />
//
//// App.js
//import { CurrentUserBroadcast, CurrentUserSubscriber } from './Broadcasts'
//
//<CurrentUserBroadcast value={user}/>
//<CurrentUserSubscriber>{user => ...}</CurrentUserSubscriber>
```

Enjoy!
