import React from 'react';

import UserBox from './UserBox.js';
import Admin from './Admin.js';
import PlayerUI from './PlayerUI.js';
import Ranking from './Ranking.js';

import { defineStore } from './DefineStore.js';
import { createGame } from './Game.js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gameId = defineStore.getState().game.id;
    let game = gameId ? `Jogo ${gameId}` :
        (<a onClick={createGame}>Criar jogo</a>);

    return (<div>
        <UserBox user={defineStore.getState().user} />
        {defineStore.getState().game.admin ? <Admin /> : <PlayerUI />}
        <a href="/logout">sair</a> <span>{game}</span>
        <hr />
        <Ranking users={defineStore.getState().users} />
      </div>);
  }
}
