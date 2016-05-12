import { createStore } from 'redux';

const defineReducer = (state, action) => {
  state = state || {};
  if (action.type === 'SET-USER') {
      return {
        user: action.user
      };
  }
  return state;
};

export var defineStore = createStore(defineReducer);
