import { createStore } from 'redux';

function addUser(user, users) {

}

const defineReducer = (state, action) => {
  state = state || { users: [] };
  if (action.type === 'SET-USER') {
      return {
        user: action.user,
        users: state.users
      };
  } else if (action.type === 'ADD-USER') {
    return {
      user: state.user,
      users: state.users.filter((u) => u.id != action.user.id).concat(action.user)
    };
  }
  return state;
};

export var defineStore = createStore(defineReducer);
