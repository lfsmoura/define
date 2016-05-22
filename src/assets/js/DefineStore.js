import { createStore } from 'redux';
import reducers from './reducers';

export var defineStore = createStore(reducers);
