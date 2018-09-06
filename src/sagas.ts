import {put, select, takeEvery} from 'redux-saga/effects'
import {IAction, IPositionXY, loadObjects, movePlayer, setPlayerPosition} from './actions/game'
import {convert2to1, pixelsToCoords} from './coordConverter'
import {IMap, IState} from './model'

function* loadMapSaga(action: IAction<IMap>) {
    const map = action.payload
    const objectsByPosition = Array(map.height * map.width)
    if (map.layersByName.meta.data) {
        const metaDefs: number[] = map.layersByName.meta.data
        if (map.entities) { // TODO remove this
            const gidProperties = map.entities
            for (let i = 0; i < metaDefs.length; i++) {
                objectsByPosition[i] = gidProperties[metaDefs[i]]
            }
        }
    }

    if (map.layersByName.objects.objects) {
        const objects = map.layersByName.objects.objects
        for (const object of objects) {
            const xy = pixelsToCoords(object.x, object.y)
            if (object.name === 'playerSpawnPoint') {
                yield put(setPlayerPosition({x: xy[0], y: xy[1]}))
            }
        }
    }

    yield put(loadObjects(objectsByPosition))
}

function* setPlayerPositionSaga(action: IAction<IPositionXY>) {
    const mapWidth = yield select((state: IState) => state.map.width)
    const pos = convert2to1(action.payload.x, action.payload.y, mapWidth)
    const objectsByPosition = yield select((state: IState) => state.objectsByPosition)
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
