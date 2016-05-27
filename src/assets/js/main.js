//require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index.js';

import { defineStore } from './DefineStore.js';
import { user } from './user.js'

const render = () => {
  ReactDOM.render(<Index user={user} />,
      document.getElementById('main'));
};

defineStore.subscribe(render);
