export default function game(state = { answers: [] }, action) {
  switch (action.type) {
    case 'SET-GAME':
      return Object.assign({}, state, action.game);
    case 'SET-QUESTION':
      return Object.assign({}, state, { question: action.question });
    case 'SET-ANSWER':
      return Object.assign({},
        state,
        { answers: state.answers.filter((a) => a.userId != action.answer.userId).concat(action.answer)});
    default:
      return state;
  }
};
