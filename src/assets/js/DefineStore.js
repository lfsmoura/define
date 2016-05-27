import { createStore, applyMiddleware, combineReducers } from 'redux';
import io from 'socket.io-client';

import game from './reducers/game.js';
import users from './reducers/users.js';

import { loadUser } from './user.js';

export var defineStore = createGlobalStore(combineReducers({ game, users }), loadUser);

function makeResetable(reducer) {
  return (state, action) => action.type === 'global.RESET' ? reducer(action.state, action) : reducer(state, action);
}

function createGlobalStore(reducer, cb) {
  var socket = io();
  var store = createStore(makeResetable(reducer));
  var _dispatch = store.dispatch;

  store.dispatch = (action) => socket.emit('action', action);

  socket.on('action', (action) => { console.log(action, store.getState()); _dispatch.call(store, action); });

  socket.emit('join', {}, (state) => {
    _dispatch.call(store, {
      type: 'global.RESET',
      state
    });
    cb(null, store);
  });

  store.subscribe(() => socket.emit('state', store.getState()));

  return store;
}
