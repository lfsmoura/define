import React from 'react';

import UserBox from './UserBox.js';

import { defineStore } from './DefineStore.js';

import { createGame } from './Game.js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gameId = defineStore.getState().gameId;
    let game = gameId ? `Jogo ${gameId}` :
        (<a onClick={createGame}>Criar jogo</a>);
    return (<div>
        <UserBox user={defineStore.getState().user} />
        <a href="/logout">sair</a> <span>{game}</span>
      </div>);
  }
}
