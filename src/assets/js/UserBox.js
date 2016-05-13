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
    return (<div className="row">
      <div className="col-md-2">
        <img src={this.getUserImageUrl(this.props.user.id)} />
      </div>
      <div className="col-md-10">
        {this.props.user.displayName}
      </div>
      </div>);
  }
}
