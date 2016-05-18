import { createStore } from 'redux';

const defineReducer = (state, action) => {
  state = state || { user: {}, users: [], game: { answers: [] } };
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
  } else if (action.type === 'SET-ANSWER') {
    return {
      user: state.user,
      users: state.users,
      game: {
        id: state.game.id,
        admin: state.game.admin,
        question: state.game.question,
        answers: state.game.answers.filter((a) => a.user.id != action.answer.user.id).concat(action.answer)
      }
    };
  }
  return state;
};

export var defineStore = createStore(defineReducer);
