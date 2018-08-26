import 'normalize.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createContainer from './createContainer'
import './index.css'
import gameReducer from './reducers/game'
import './Rogue.css'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(gameReducer,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(mySaga)

const c = createContainer(store)
const Game = c.get('Game')

ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))

