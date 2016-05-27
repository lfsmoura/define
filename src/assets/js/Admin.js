import React from 'react';
import { defineStore } from './DefineStore.js';
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
    defineStore.dispatch({ type: 'SET-QUESTION', question: value });
  }

  render() {
    const state = defineStore.getState();
    var answerList = state.game.answers.map((answer) => {
      const user = state.users.find(u => u.id === answer.userId);
      return (<li key={`answer-${user.id}`} className="list-group-item row">
          <div className="col-md-2">
            <UserBox user={user} />
          </div>
          <div className="col-md-10">
            {answer.answer}
          </div>
        </li>);
    });
    return <div>
      <Input label="Questão" onSubmit={this.submitQuestion.bind(this)} />
      {state.game.question ? <h2>{state.game.question}</h2> : ''}
      {answerList}
    </div>;
  }
}
