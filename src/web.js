const Hapi = require('hapi');
const config = require('./config.js')

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: config.PORT
});

function loadRoutes(server) {
  require("fs").readdirSync('./src/controllers').forEach(function(file) {
    console.log(file);
    server.route(require("./controllers/" + file));
  });
}

var io = require('socket.io')(server.listener);

var setGlobalStore = function({ io, prefix = 'global' } = {}) {
  var state = {};

  io.on('connection', (socket) => {
    socket.on(`${prefix}.join`, function (ignore, cb) {
      return cb(state);
    });

    socket.on(`${prefix}.action`, function (action) {
        socket.emit(`${prefix}.action`, action);
        socket.broadcast.emit(`${prefix}.action`, action);
    });

    socket.on(`${prefix}.state`, function(newState) {
      state = newState;
    });
  })
};

setGlobalStore({ io });


server.register(
    [
      require('inert'),
      require('bell'),
      require('hapi-auth-cookie')
    ], function(err) {
        if (err) {
            console.error('failed to load plugin');
        }

        // bell
        server.auth.strategy('facebook', 'bell', {
            provider: 'facebook',
            //location: 'http://localhost:8000',
            password: config.COOKIE_PASSWORD,
            clientId: config.FACEBOOK_CLIENT_ID,
            clientSecret: config.FACEBOOK_CLIENT_SECRET,
            isSecure: false     // required if not using HTTPS especially if developing locally
        });

        // session
        const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
        server.app.cache = cache;

        server.auth.strategy('session', 'cookie', true, {
            password: config.COOKIE_PASSWORD,
            cookie: 'sid-example',
            isSecure: false,
            redirectTo: '/login',
            validateFunc(request, session, callback) {
                cache.get(session.sid, (err, cached) => {
                    if (err) {
                        return callback(err, false);
                    }

                    if (!cached) {
                        return callback(null, false);
                    }

                    return callback(null, true, cached.account);
                });
            }
        });

        loadRoutes(server);

        server.start((err) => {

            if (err) {
                throw err;
            }
            console.log('Server running at:', server.info.uri);
        });
});
