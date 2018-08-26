import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import 'normalize.css'
import './index.css'
import './Rogue.css'
import gameReducer from './reducers/game'
import createContainer from './createContainer'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'
import {Hello} from './components/Hello'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(gameReducer,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(mySaga)

let c = createContainer(store)
let Game = c.get('Game')

//ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))
ReactDOM.render(<Hello compiler="asdf" framework="zxcv"/>, document.getElementById('root'))
