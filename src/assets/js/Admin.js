import React from 'react';
import { defineStore } from './DefineStore.js';
import { createQuestion } from './Game.js';
import UserBox from './UserBox.js';
import Input from './Input.js';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  submitQuestion(value) {
    createQuestion(value);
  }

  render() {
    const state = defineStore.getState();
    var answerList = state.game.answers.map((answer) => {
      return (<li key={`answer-${answer.userId}`} className="list-group-item row">
          <div className="col-md-2">
            <UserBox user={answer.user} />
          </div>
          <div className="col-md-10">
            {answer.answer}
          </div>
        </li>);
    });
    return <div>
      {answerList}
      <Input label="Questão" onSubmit={this.submitQuestion.bind(this)} />
    </div>;
  }
}
