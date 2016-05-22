export default const user = function(state = {}, action) {
  switch (action.type) {
    case 'SET-USER':
      return action.user;
    case 'ADD-POINT':
      return state.id === action.user.id ? { ...state, points: (state.points || 0) + action.points } : state;
    default:
      return state;
  }
};
