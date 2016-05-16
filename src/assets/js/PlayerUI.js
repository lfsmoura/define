import React from 'react';

import { defineStore } from './DefineStore.js';

export default class PlayerUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const state = defineStore.getState();
      return <div>
        {state.game.question ? <h2>{state.game.question}</h2> : ''}
      </div>;
  }
}
