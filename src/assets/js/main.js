require("../css/main.css");

import React from 'react';
import ReactDOM from 'react-dom';

const render = () => {
    ReactDOM.render(<div>Hello World</div>,
        document.getElementById('main'));
};

render();
