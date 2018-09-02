"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var game_1 = require("./actions/game");
exports["default"] = (function (charController) {
    return /** @class */ (function (_super) {
        __extends(MovementInput, _super);
        function MovementInput() {
            return _super.call(this, {}) || this;
        }
        MovementInput.prototype.render = function () {
            return (React.createElement("div", { className: "movement-input", tabIndex: 0, onKeyDown: this.onKeyPressed }));
        };
        MovementInput.prototype.componentDidMount = function () {
            this.focusDiv();
        };
        MovementInput.prototype.componentDidUpdate = function () {
            this.focusDiv();
        };
        MovementInput.prototype.onKeyPressed = function (event) {
            var direction;
            switch (event.key) {
                case 'ArrowUp':
                    direction = game_1.Direction.up;
                    break;
                case 'ArrowDown':
                    direction = game_1.Direction.down;
                    break;
                case 'ArrowLeft':
                    direction = game_1.Direction.left;
                    break;
                case 'ArrowRight':
                    direction = game_1.Direction.right;
                    break;
                default:
            }
            if (direction) {
                charController.move(direction);
            }
        };
        MovementInput.prototype.focusDiv = function () {
            var myRef = React.createRef();
            var node = myRef.current;
            if (node) {
                node.focus();
            }
        };
        return MovementInput;
    }(React.Component));
});
