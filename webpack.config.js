const path = require('path');
module.exports = {
    entry: "./src/assets/js/main.js",
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: "style!css" },
          {
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
    }
};
