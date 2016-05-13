import React from 'react';

import UserBox from './UserBox.js';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var userList = this.props.users.map((user) => {
      return (<li key={`player-${user.id}`} className="list-group-item">
          <UserBox user={user}/>
        </li>);
    });
    return (<ul className="list-group">
          {userList}
        </ul>);
  }
}
