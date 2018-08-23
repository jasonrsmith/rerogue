import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import 'normalize.css'
import './index.css'
import './Rogue.css'
import gameReducer from './reducers/game'
import createContainer from './createContainer'

const store = createStore(gameReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

let c = createContainer(store)
let Game = c.get('Game')

ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))
