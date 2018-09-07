import * as React from 'react'
import {Direction} from './actions'
import {CharacterController} from './CharacterController'

export const createMovementInputComponent = (charController: CharacterController) =>
    class MovementInput extends React.Component {
        constructor() {
            super({})
        }

        public render() {
            return (
                <div className="movement-input"
                     tabIndex={0}
                     onKeyDown={this.onKeyPressed}
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
                charController.move(direction)
            }
        }

        private focusDiv() {
            const myRef = React.createRef<HTMLDivElement>()
            const node = myRef.current
            if (node) {
                node.focus()
            }
        }
    }
