//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';

import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';

const render = () => {
  var users = defineStore.getState().users.map((user) => {
    return (<li key={`player-${user.id}`} className="list-group-item">
        <UserBox user={user}/>
      </li>);
  });
  var logout = defineStore.getState().user ? (<a href="/logout">sair</a>) : '';
  ReactDOM.render((<div>
      <UserBox user={defineStore.getState().user} />
      {logout}
      <ul className="list-group">
        {users}
      </ul>
    </div>),
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
