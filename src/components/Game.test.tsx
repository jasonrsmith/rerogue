import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {IBoardComponentProps} from './Board'
import {createGameComponent} from './Game'
import {IMovementInputProps} from './MovementInput'

/* tslint:disable:max-classes-per-file */
it('renders without crashing', () => {
    const div = document.createElement('div')
    const Board = class BoardCompontentType extends React.Component<IBoardComponentProps>{}
    const MovementInput = class MovementInputType extends React.Component<IMovementInputProps>{}
    const Game = createGameComponent(Board, MovementInput)
    ReactDOM.render(<Game/>, div)
    ReactDOM.unmountComponentAtNode(div)
})
