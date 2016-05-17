import React from 'react';
import { defineStore } from './DefineStore.js';
import { createQuestion } from './Game.js';

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

      return <Input label="Question" onSubmit={this.submitQuestion.bind(this)} />;
  }
}
