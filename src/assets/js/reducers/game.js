export default function game(state = { answers: [] }, action) {
  switch (action.type) {
    case 'SET-GAME':
      return action.game;
    case 'SET-ANSWER':
      return Object.assign({},
        state,
        { answers: state.answers.filter((a) => a.user.id != action.answer.user.id).concat(action.answer)});
    default:
      return state;
  }
};
