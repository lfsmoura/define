import { createStore } from 'redux';

const defineReducer = (state, action) => {
  state = state || { user: {}, users: [], game: {} };
  if (action.type === 'SET-USER') {
      return {
        user: action.user,
        users: state.users,
        game: state.game
      };
  } else if (action.type === 'ADD-USER') {
    return {
      user: state.user,
      users: state.users.filter((u) => u.id != action.user.id).concat(action.user),
      game: state.game
    };
  } else if (action.type === 'SET-GAME') {
    return {
      user: state.user,
      users: state.users,
      game: action.game
    };
  }
  return state;
};

export var defineStore = createStore(defineReducer);
