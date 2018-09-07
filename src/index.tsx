import 'normalize.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createContainer from './createContainer'
import './index.css'
import {reducers} from './reducers'
import './Rogue.css'
import {initGameSaga} from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(initGameSaga)

const c = createContainer(store)
const Game = c.get('Game')

ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))
