export default function users(state = [], action) {
  switch (action.type) {
    case 'ADD-USER':
      let user = state.find((user) => user.id === action.user.id) || {};
      return state.filter((u) => u.id != action.user.id).concat(Object.assign(action.user, user));
    case 'ADD-POINT': {
      let user = state.find((user) => user.id === action.user.id);
      const newUser = Object.assign({}, user, { points: (user.points || 0) + action.points });
      return state.filter((u) => u.id != action.user.id).concat(newUser);
    }
    default:
      return state;
  }
};
