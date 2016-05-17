import React from 'react';

import { defineStore } from './DefineStore.js';
import Input from './Input.js';

export default class PlayerUI extends React.Component {
  constructor(props) {
    super(props);
  }

  submitAnswer(answer) {
    console.log('submit question');
  }

  render() {
    const state = defineStore.getState();
      return <div>
        {state.game.question ? <h2>{state.game.question}</h2> : ''}
        <Input label="Answer" onSubmit={this.submitAnswer.bind(this)} />
      </div>;
  }
}
