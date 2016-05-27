import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.value);
    this.setState({ value:'' });
    event.preventDefault();
  }

  render() {
      return <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="form-group">
        <label for={this.props.label}>{this.props.label}</label>
        <input
          id={this.props.label}
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
          </fieldset>
      </form>;
  }
}
