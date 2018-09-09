import 'normalize.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {init} from './actions'
import createContainer from './createContainer'
import './index.css'
import {reducers} from './reducers'
import './Rogue.css'
import {setupSagas} from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(setupSagas)

const c = createContainer(store)
const Game = c.get('Game')

store.dispatch(init())

ReactDOM.render(<Provider store={store}><Game/></Provider>, document.getElementById('root'))
