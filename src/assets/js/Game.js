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
  socket.emit('iam', defineStore.getState().user);
});

socket.on('iam', (user) => {
  defineStore.dispatch({
    type: "ADD-USER",
    user
  });
});

export function createGame() {
  socket.emit('creategame', {}, function(id) {
    defineStore.dispatch({
      type: "SET-GAME",
      id,
      admin: true
    });
  });
}

socket.on('newgame', (id) => {
    defineStore.dispatch({
      type: "SET-GAME",
      id
    });
});
