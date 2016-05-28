import { combineReducers } from 'redux';

import game from './reducers/game.js';
import users from './reducers/users.js';

import { loadUser } from './user.js';

import createGlobalStore from './globalState.js';

export var defineStore = createGlobalStore({ reducer: combineReducers({ game, users }) }, loadUser);
