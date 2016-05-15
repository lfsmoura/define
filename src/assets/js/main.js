//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Index from './Index.js';
import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';
import { socket } from './Game.js';

const render = () => {
  ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={Index}/>
  </Router>),
      document.getElementById('main'));
};

defineStore.subscribe(render);
render();
