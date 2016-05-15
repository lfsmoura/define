//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.js';

import { defineStore } from './DefineStore.js';
import { socket } from './Game.js';

const render = () => {
  ReactDOM.render(<Index/>,
      document.getElementById('main'));
};

defineStore.subscribe(render);
render();
