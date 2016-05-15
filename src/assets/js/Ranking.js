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
    return (<div>
        <h2>Ranking</h2>
        <ul className="list-group">
            {userList}
          </ul>
      </div>);
  }
}
