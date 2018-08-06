import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import 'normalize.css';
import './index.css';
import './Rogue.css';
import Game from './components/Game';
import {setPlayerPosition} from './actions/game';
import gameReducer from './reducers/game';

const store = createStore(gameReducer);
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
store.dispatch(setPlayerPosition(0, 1));
store.dispatch(setPlayerPosition(0, 2));

// ========================================

ReactDOM.render(<Game/>, document.getElementById("root"));

