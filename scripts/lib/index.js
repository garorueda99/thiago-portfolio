"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// State management is tackled with a minimal version of Redux.
// There's one global state object, and it can only be updated through a
// dispatcher.
function createStore(reducer, initialState) {
  var currentState = initialState;
  var listeners = [];

  return {
    getState: function getState() {
      return currentState;
    },
    subscribe: function subscribe(fn) {
      listeners.push(fn);
    },
    dispatch: function dispatch(action) {
      currentState = reducer(currentState, action);

      listeners.forEach(function (listener) {
        return listener();
      });

      return action;
    }
  };
}

console.log("Woo");

function combineReducers() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  var reducerKeys = Object.keys(reducers);

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    reducerKeys.reduce(function (nextState, reducerKey) {
      return _extends({}, nextState, _defineProperty({}, reducerKey, reducers[reducerKey](state, action)));
    }, {});
  };
}