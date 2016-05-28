import { combineReducers } from 'redux';

import game from './reducers/game.js';
import users from './reducers/users.js';

import { loadUser } from './user.js';

import createGlobalStore from 'global-state-client';

var room = +location.hash.substr(1) > 0 ? location.hash.substr(1) : undefined;

export var defineStore = createGlobalStore({ room, reducer: combineReducers({ game, users }) }, loadUser);
