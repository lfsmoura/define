import React from 'react';

import { defineStore } from './DefineStore.js';

import UserBox from './UserBox.js';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const users = this.props.users.sort(function(userA, userB) {
        return (userB.points || 0) - (userA.points || 0);
      });
    var userList = users.map((user) => {
      return (<li key={`player-${user.id}`} className="list-group-item">
          <UserBox user={user}/>
          {this.props.admin ? <span>
            <a onClick={() => defineStore.dispatch({ type: 'ADD-POINT', user, points: 1 })} className="btn btn-info">+1</a>
            <a onClick={() => defineStore.dispatch({ type: 'ADD-POINT', user, points: 2 })} className="btn btn-success">+2</a></span> : ''}
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
