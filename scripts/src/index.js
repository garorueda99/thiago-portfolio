import { createStore, combineReducers } from './pseudo-redux.js';

const store = createStore(function(){}, 5);

console.log("Created", store);
