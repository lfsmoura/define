import { combineReducers } from 'redux';

import game from './game.js'
import user from './user.js'
import users from './users.js'

export default combineReducers({ game, user, users });
