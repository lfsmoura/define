import React from 'react';
import { defineStore } from './DefineStore.js';
import { createQuestion } from './Game.js';
export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    createQuestion(this.state.value);
    return false;
  }

  render() {
      return <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="form-group">
        <label for="question">Question</label>
        <input
          id="question"
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
          </fieldset>
      </form>;
  }
}
