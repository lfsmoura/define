import React from 'react';

export default class UserBox extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserImage(id) {
    if (id) {
      // square < normal < large
      return <img src={`http://graph.facebook.com/${id}/picture?type=square`} />;
    } else {
      return '-';
    }
  }

  render() {
    const user = this.props.user;
    return (<div className="row">
      <div className="col-xs-3">
        {this.getUserImage(user.id)}
      </div>
      <div className="col-xs-9">
        {user.displayName} {user.points ? `(${user.points})` : ''}
      </div>
      </div>);
  }
}
