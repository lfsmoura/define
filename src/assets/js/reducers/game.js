export default const game = function(state = { answers: [] }, action) {
  switch (action.type) {
    case 'SET-GAME':
      return action.game;
    case 'SET-ANSWER':
      return {
        ...state,
        answers: state.answers.filter((a) => a.user.id != action.answer.user.id).concat(action.answer)
      };
    default:
      return state;
  }
};
