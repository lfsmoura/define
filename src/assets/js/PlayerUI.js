import React from 'react';

import { defineStore } from './DefineStore.js';
import Input from './Input.js';

import { createAnswer } from './Game.js';

export default class PlayerUI extends React.Component {
  constructor(props) {
    super(props);
  }

  submitAnswer(answer) {
    createAnswer(answer);
  }

  render() {
    const state = defineStore.getState();
    var answerList = state.game.answers.map((answer) => {
      return (<li key={`answer-${answer.userId}`} className="list-group-item">
          {answer.answer}
        </li>);
    });
    if (state.game.id) {
      return <div>
        {state.game.question ? <h2>{state.game.question}</h2> : ''}
        <Input label="Resposta" onSubmit={this.submitAnswer.bind(this)} />
        <hr />
        {answerList}
      </div>;
    } else {
      return <div> Esperando jogo </div>;
    }
  }
}
