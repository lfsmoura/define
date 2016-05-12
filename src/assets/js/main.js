//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';

import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';

const render = () => {
    ReactDOM.render(<div>
        <UserBox user={defineStore.getState().user} />
      </div>,
        document.getElementById('main'));
};

defineStore.subscribe(render);
render();

// get user information
let req = new XMLHttpRequest();
req.addEventListener("load", () => {
  defineStore.dispatch({
    type: "SET-USER",
    user: JSON.parse(req.response)
  })
});
req.open("GET", "/session");
req.send();
