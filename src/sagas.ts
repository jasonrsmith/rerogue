import {call, put, select, takeEvery} from 'redux-saga/effects'
import {
    actions, Direction,
    IAction,
    IPositionXY,
    loadMap,
    loadObjects,
    mapLoaded,
    movePlayer,
    setPlayerPosition,
} from './actions'
import {convert2to1, pixelsToCoords} from './coordConverter'
import {fetchMap} from './fetchMap'
import {IMap, IState} from './model'

function* initGameSaga() {
    yield put(loadMap('dungeon-map.json'))
}

function* loadMapSaga(action: IAction<string>) {
    const mapName = action.payload
    const map = yield call(fetchMap, mapName)
    yield put(mapLoaded(map))
}

function* mapLoadedSaga(action: IAction<IMap>) {
    const map = action.payload
    const objectsByPosition = Array(map.height * map.width)
    if (map.layersByName.meta.data) {
        const metaDefs: number[] = map.layersByName.meta.data
        if (map.entities) {
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

function* movementInputReceivedSaga(action: IAction<Direction>) {
    const direction = action.payload
    const {x, y} = yield select((state: IState) => ({ x: state.player.x, y: state.player.y }))
    switch (direction) {
        case Direction.up:
            return yield put(setPlayerPosition({x, y: y - 1}))
        case Direction.down:
            return yield put(setPlayerPosition({x, y: y + 1}))
        case Direction.left:
            return yield put(setPlayerPosition({x: x - 1, y}))
        case Direction.right:
            return yield put(setPlayerPosition({x: x + 1, y}))
        default:
    }
}

export function* setupSagas() {
    yield takeEvery(actions.INIT, initGameSaga)
    yield takeEvery(actions.LOAD_MAP, loadMapSaga)
    yield takeEvery(actions.MAP_LOADED, mapLoadedSaga)
    yield takeEvery(actions.SET_PLAYER_POSITION, setPlayerPositionSaga)
    yield takeEvery(actions.MOVEMENT_INPUT_RECEIVED, movementInputReceivedSaga)
}
