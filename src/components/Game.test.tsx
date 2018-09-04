import {Substitute} from '@fluffy-spoon/substitute'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {IMapLoader} from '../MapLoader'
import {IBoardComponentProps} from './Board'
import {createGameComponent} from './Game'

it('renders without crashing', () => {
    const div = document.createElement('div')
    const mapLoader = Substitute.for<IMapLoader>()
    const BoardComponent = class Board extends React.Component<IBoardComponentProps> {
    }
    const Game = createGameComponent(BoardComponent, mapLoader)
    ReactDOM.render(<Game/>, div)
    ReactDOM.unmountComponentAtNode(div)
})
