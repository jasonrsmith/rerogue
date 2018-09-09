import * as React from 'react'
import {Direction} from '../actions'

export interface IMovementInputProps {
    dispatchMovementInputReceived: (direction: Direction) => void
}

export class MovementInput extends React.Component<IMovementInputProps> {
    private myRef = React.createRef<HTMLDivElement>()

    public render() {
        const refocus = () => {
            this.focusDiv()
        }
        const onKeyPressed = (e: React.KeyboardEvent) => {
            this.onKeyPressed(e)
        }
        return (
            <div
                ref={this.myRef}
                className="movement-input"
                tabIndex={0}
                onKeyDown={onKeyPressed}
                onBlur={refocus}
            />
        )
    }

    public componentDidMount() {
        this.focusDiv()
    }

    public componentDidUpdate() {
        this.focusDiv()
    }

    private onKeyPressed(event: React.KeyboardEvent) {
        let direction
        switch (event.key) {
            case 'ArrowUp':
                direction = Direction.up
                break
            case 'ArrowDown':
                direction = Direction.down
                break
            case 'ArrowLeft':
                direction = Direction.left
                break
            case 'ArrowRight':
                direction = Direction.right
                break
            default:
        }

        if (direction !== undefined) {
            this.props.dispatchMovementInputReceived(direction)
        }
    }

    private focusDiv() {
        const node = this.myRef.current
        if (node) {
            node.focus()
        }
    }
}
