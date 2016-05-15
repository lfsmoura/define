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
    const state = defineStore.getState();
    let gameId = state.game.id;
    let game = gameId ? `Jogo ${gameId}` :
        (<a onClick={createGame}>Criar jogo</a>);

    return (<div>
        <UserBox user={state.user} />
        {state.game.admin === state.user.id ? <Admin /> : <PlayerUI />}
        <a href="/logout">sair</a> <span>{game}</span>
        <hr />
        <Ranking users={state.users} />
      </div>);
  }
}
