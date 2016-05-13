//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Index from './Index.js';
import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';

const render = () => {
  ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={Index}/>
  </Router>),
      document.getElementById('main'));
};

defineStore.subscribe(render);
render();

var socket = io();
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

function createGame() {
  socket.emit('creategame', {}, function(id) {
    defineStore.dispatch({
      type: "SET-GAME",
      id
    });
  });
}
