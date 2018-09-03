import {put, select, takeEvery} from 'redux-saga/effects'
import {loadObjects, movePlayer, setPlayerPosition} from './actions/game'
import {convert2to1, pixelsToCoords} from './coordConverter'

function* loadMapSaga(action: any) {
    const objectsByPosition = Array(action.map.height * action.map.width)
    const metaDefs = action.map.layersByName.meta.data
    const gidProperties = action.map.gidProperties
    for (let i = 0; i < metaDefs.length; i++) {
        objectsByPosition[i] = gidProperties[metaDefs[i]]
    }

    const objects = action.map.layersByName.objects.objects
    for (const object of objects) {
        const xy = pixelsToCoords(object.x, object.y)
        if (object.name === 'playerSpawnPoint') {
            yield put(setPlayerPosition({x: xy[0], y: xy[1]}))
        }
    }

    yield put(loadObjects(objectsByPosition))
}

function* setPlayerPositionSaga(action: any) {
    const mapWidth = yield select((state: any) => state.map.width)
    const pos = convert2to1(action.x, action.y, mapWidth)
    const objectsByPosition = yield select((state: any) => state.objectsByPosition)
    if (objectsByPosition && objectsByPosition[pos]) {
        if (!objectsByPosition[pos].hasOwnProperty('collidable')) {
            yield put(movePlayer({x: action.x, y: action.y}))
            return
        }
        else {
            return
        }
    }
    yield put(movePlayer({x: action.x, y: action.y}))
}

function* mySaga() {
    yield takeEvery('LOAD_MAP', loadMapSaga)
    yield takeEvery('SET_PLAYER_POSITION', setPlayerPositionSaga)
}

export default mySaga
