export default const users = function(state = [], action) {
  switch (action.type) {
    case 'ADD-USER':
      const user = state.users.find((user) => user.id === action.user.id) || {};
      return state.filter((u) => u.id != action.user.id).concat(Object.assign(action.user, user));
    default:
      return state;
  }
};
