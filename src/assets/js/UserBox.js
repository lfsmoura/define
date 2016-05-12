import React from 'react';

export default class UserBox extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserImageUrl(id) {
    // square < normal < large
    return `http://graph.facebook.com/${id}/picture?type=square`;
  }

  render() {
    if (this.props.user) {
      return (<div>
        <img src={this.getUserImageUrl(this.props.user.id)} />
        {this.props.user.displayName} 
        (<a href="/logout">sair</a>)
        </div>)
    } else {
      return (<a href="/login/facebook"> Login com facebook </a>);
    }
  }
}
