import { createStore } from 'redux';

const defineReducer = (state, action) => {
  state = state || {};
  if (action.type === 'SET-USER') {
      return {
        user: action.user,
        users: state.users
      };
  } else if (action.type === 'ADD-USER') {
    return {
      user: state.user,
      users: state.users.concat(action.user)
    };
  }
  return state;
};

export var defineStore = createStore(defineReducer);
