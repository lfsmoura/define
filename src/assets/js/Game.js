import { defineStore } from './DefineStore.js';

export var socket = io();
// get user information
let req = new XMLHttpRequest();
req.addEventListener("load", () => {
    var user = JSON.parse(req.response);
    defineStore.dispatch({
      type: "SET-USER",
      user
    });
    socket.emit('join', user);
});
req.open("GET", "/session");
req.send();

socket.on('join', (user) => {
  defineStore.dispatch({
    type: "ADD-USER",
    user
  });
  socket.emit('iam', defineStore.getState());
});

socket.on('iam', (state) => {
  const user = state.user;
  defineStore.dispatch({
    type: "ADD-USER",
    user
  });
  if (state.game.id) {
    defineStore.dispatch({
      type: "SET-GAME",
      game: state.game
    });
  }
});

socket.on('game', (game) => {
    defineStore.dispatch({
      type: "SET-GAME",
      game
    });
});

export function createGame() {
  const user = defineStore.getState().user;
  socket.emit('creategame', user);
}

export function createQuestion(question) {
  socket.emit('game', Object.assign({}, defineStore.getState().game, { question }));
}
