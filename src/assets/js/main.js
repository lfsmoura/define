require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';

function getUserImageUrl(id) {
  return `http://graph.facebook.com/${id}/picture?type=large`;
}

const render = () => {
    ReactDOM.render(<div>
        <a href="/login/facebook"> Login com facebook </a>
      </div>,
        document.getElementById('main'));
};

render();
