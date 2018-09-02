import { Substitute } from '@fluffy-spoon/substitute'
import {configure, shallow} from 'enzyme'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Direction} from './actions/game'
import {CharacterController} from './CharacterController'
import {createMovementInputComponent} from './MovementInput'

configure({ adapter: new ReactSixteenAdapter() });

const charController = Substitute.for<CharacterController>()
const MovementInput = createMovementInputComponent(charController)

test('char is moved on input up', () => {
    const target = shallow(<MovementInput/>)
    target.simulate('keydown', {key: 'ArrowUp'})
    charController.received().move(Direction.up)
})

test('char is moved on input down', () => {
    const target = shallow(<MovementInput/>)
    target.simulate('keydown', {key: 'ArrowDown'})
    charController.received().move(Direction.down)
})
