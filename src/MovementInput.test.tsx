import {configure, shallow} from 'enzyme'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Direction} from './actions'
import {MovementInput} from './components/MovementInput'

configure({ adapter: new ReactSixteenAdapter() });

test('char is moved on input up', () => {
    const movementInputReceived = jest.fn()
    const target = shallow(<MovementInput movementInputReceived={movementInputReceived}/>)
    target.simulate('keydown', {key: 'ArrowUp'})
    expect(movementInputReceived).toBeCalledWith(Direction.up)
    expect(movementInputReceived.mock.calls.length).toBe(1);
})

test('char is moved on input down', () => {
    const movementInputReceived = jest.fn()
    const target = shallow(<MovementInput movementInputReceived={movementInputReceived}/>)
    target.simulate('keydown', {key: 'ArrowDown'})
    expect(movementInputReceived).toBeCalledWith(Direction.down)
    expect(movementInputReceived.mock.calls.length).toBe(1);
})
