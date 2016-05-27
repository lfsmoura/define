import React from 'react';

import UserBox from './UserBox.js';
import Admin from './Admin.js';
import PlayerUI from './PlayerUI.js';
import Ranking from './Ranking.js';

import { defineStore } from './DefineStore.js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  createGame() {
    defineStore.dispatch({
      type: 'SET-GAME',
      game: {
        id: 1,
        admin: this.props.user.id
      }
    })
  }

  render() {
    const state = defineStore.getState();
    const isAdmin = state.game && state.game.admin === this.props.user.id;
    let gameId = state.game.id;
    let game = gameId ? `Jogo ${gameId}` :
        (<a onClick={this.createGame.bind(this)}>Criar jogo</a>);

    return (<div>
        {isAdmin ? <Admin /> : <PlayerUI user={this.props.user} />}
        {state.game.id ? <Ranking admin={isAdmin} users={state.users} /> : ''}
        <div className="card m-a-2 p-a-2">
          <UserBox user={this.props.user} />
          <a href="/logout">sair</a> <span>{game}</span>
        </div>
      </div>);
  }
}
