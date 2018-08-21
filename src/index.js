import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import 'normalize.css'
import './index.css'
import './Rogue.css'
import {setPlayerPosition} from './actions/game'
import gameReducer from './reducers/game'
import createContainer from './createContainer'

const store = createStore(gameReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
console.log(store.getState())
store.dispatch(setPlayerPosition(0, 1))
store.dispatch(setPlayerPosition(0, 2))

let c = createContainer()
let Game = c.get('Game')

// ========================================

ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))

let url = 'dungeon.json'
fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log('Checkout this JSON! ', out)
    })
    .catch(err => { throw err })
