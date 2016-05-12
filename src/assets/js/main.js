//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';

import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';

const render = () => {
  var users = defineStore.getState().users.map((user) => {
    return (<UserBox user={user}/>);
  });
  ReactDOM.render((<div>
      <UserBox user={defineStore.getState().user} />
      {users}
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
});
