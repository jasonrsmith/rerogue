"use strict";
exports.__esModule = true;
var Direction;
(function (Direction) {
    Direction[Direction["down"] = 0] = "down";
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.setPlayerPosition = function (x, y) { return ({
    type: 'SET_PLAYER_POSITION',
    x: x,
    y: y
}); };
exports.movePlayer = function (x, y) { return ({
    type: 'MOVE_PLAYER',
    x: x,
    y: y
}); };
/*
export const placeObjectByName = (name, x, y) => ({
    type: 'PLACE_OBJECT_BY_NAME',
    name: name,
    x: x,
    y: y,
})
*/
exports.loadMap = function (map) { return ({
    type: 'LOAD_MAP',
    map: map
}); };
exports.loadObjects = function (objectsByPosition) { return ({
    type: 'LOAD_OBJECTS',
    objectsByPosition: objectsByPosition
}); };
