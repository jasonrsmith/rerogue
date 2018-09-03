import {put, select, takeEvery} from 'redux-saga/effects'
import {loadObjects, movePlayer, setPlayerPosition} from './actions/game'
import {convert2to1, pixelsToCoords} from './coordConverter'

function* loadMapSaga(action: any) {
    const map = action.payload
    const objectsByPosition = Array(map.height * map.width)
    const metaDefs = map.layersByName.meta.data
    const gidProperties = map.gidProperties
    for (let i = 0; i < metaDefs.length; i++) {
        objectsByPosition[i] = gidProperties[metaDefs[i]]
    }

    const objects = map.layersByName.objects.objects
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
    const pos = convert2to1(action.payload.x, action.payload.y, mapWidth)
    const objectsByPosition = yield select((state: any) => state.objectsByPosition)
    if (objectsByPosition && objectsByPosition[pos]) {
        if (!objectsByPosition[pos].hasOwnProperty('collidable')) {
            yield put(movePlayer({x: action.payload.x, y: action.payload.y}))
            return
        }
        else {
            return
        }
    }
    yield put(movePlayer({x: action.payload.x, y: action.payload.y}))
}

function* mySaga() {
    yield takeEvery('LOAD_MAP', loadMapSaga)
    yield takeEvery('SET_PLAYER_POSITION', setPlayerPositionSaga)
}

export default mySaga
