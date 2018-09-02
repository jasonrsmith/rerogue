"use strict";
exports.__esModule = true;
var substitute_1 = require("@fluffy-spoon/substitute");
var enzyme_1 = require("enzyme");
var React = require("react");
var MovementInput_1 = require("./MovementInput");
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.doSomething = function () {
        console.log('doing');
    };
    return SomeClass;
}());
var charController = substitute_1.Substitute["for"]();
var target = MovementInput_1["default"](charController);
test('char is moved on input', function () {
    console.log(Object.keys(target));
    console.log(Object.keys(SomeClass));
    var output = enzyme_1.shallow(React.createElement(MovementInput_1["default"], null));
    // console.log(output)
    // charController.received().move(Arg.any())
});
