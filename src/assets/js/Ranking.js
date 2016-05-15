import React from 'react';

import UserBox from './UserBox.js';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users.sort(function(userA, userB) {
        return userA.displayName.length - userB.displayName.length;
      });
    console.log(users);
    var userList = users.map((user) => {
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
