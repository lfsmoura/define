import { createStore } from 'redux';

function addUser(user, users) {

}

const defineReducer = (state, action) => {
  state = state || { user: {}, users: [] };
  if (action.type === 'SET-USER') {
      return {
        user: action.user,
        users: state.users,
        state: state.id
      };
  } else if (action.type === 'ADD-USER') {
    return {
      user: state.user,
      users: state.users.filter((u) => u.id != action.user.id).concat(action.user),
      gameId: state.id
    };
  } else if (action.type === 'SET-GAME') {
    return {
      user: state.user,
      users: state.users,
      gameId: action.id
    }
  }
  return state;
};

export var defineStore = createStore(defineReducer);
