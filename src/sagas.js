import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {convert2to1} from './coordConverter'
import {movePlayer} from './actions/game'

function* loadMap(action) {
    const objectsByPosition = Array(action.map.height * action.map.width)
    const metaDefs = action.map.layersByName['meta'].data
    const gidProperties = action.map.gidProperties
    for (let i=0; i< metaDefs.length; i++) {
        objectsByPosition[i] = gidProperties[metaDefs[i]]
    }
    yield put({
        type: "LOAD_OBJECTS",
        objectsByPosition: objectsByPosition
    })
}

function* setPlayerPosition(action) {
    const pos = convert2to1(action.x, action.y)
    if (!action.objectsByPosition[pos].hasOwnProperty('collidable')) {
        yield put(movePlayer(action.x, action.y))
    }
    else {
        console.log('collision!')
    }
}

function* mySaga() {
    yield takeEvery("LOAD_MAP", loadMap)
    yield takeEvery("SET_PLAYER_POSITION", setPlayerPosition)
}

export default mySaga
