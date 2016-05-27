import { defineStore } from './DefineStore.js';

export var user = {};

export function loadUser() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", () => {
      Object.assign(user, JSON.parse(req.response));
      defineStore.dispatch({
        type: 'ADD-USER',
        user
      });
  });
  req.open("GET", "/session");
  req.send();
}
