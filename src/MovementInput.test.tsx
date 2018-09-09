import {configure, shallow} from 'enzyme'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {Direction} from './actions'
import {MovementInput} from './components/MovementInput'

configure({ adapter: new ReactSixteenAdapter() });

test('char is moved on input up', () => {
    const dispatchMovementInputReceived = jest.fn()
    const target = shallow(<MovementInput dispatchMovementInputReceived={dispatchMovementInputReceived}/>)
    target.simulate('keydown', {key: 'ArrowUp'})
    expect(dispatchMovementInputReceived).toBeCalledWith(Direction.up)
    expect(dispatchMovementInputReceived.mock.calls.length).toBe(1);
})

test('char is moved on input down', () => {
    const dispatchMovementInputReceived = jest.fn()
    const target = shallow(<MovementInput dispatchMovementInputReceived={dispatchMovementInputReceived}/>)
    target.simulate('keydown', {key: 'ArrowDown'})
    expect(dispatchMovementInputReceived).toBeCalledWith(Direction.down)
    expect(dispatchMovementInputReceived.mock.calls.length).toBe(1);
})
