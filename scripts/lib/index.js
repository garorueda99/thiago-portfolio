(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

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

var store = createStore(function () {}, 5);

console.log("Created", store);

})));