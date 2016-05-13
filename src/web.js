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

let gameId = 0;
io.on('connection', function (socket) {
    socket.on('join', function (user) {
        io.emit('join', user);
    });

    socket.on('iam', function (user) {
        socket.broadcast.emit('iam', user);
    });

    socket.on('creategame', (ignore, fn) => { fn(gameId++) });
});


server.register(
    [
      require('inert'),
      {
          register: require('hapi-sequelize'),
          options: {
              uri: config.DATABASE_URL,
              models: './src/models/**/*.js',
              sequelize: {
                  define: {
                      underscoredAll: true
                  }
              }
          }
      },
      require('bell'),
      require('hapi-auth-cookie')
    ], function(err) {
        if (err) {
            console.error('failed to load plugin');
        }

        server.ext('onPreHandler', function(modelCollections) {
            return function(request, reply) {
                request.models = modelCollections;
                reply.continue();
            }
        }(server.plugins['hapi-sequelize'].db.sequelize.models));

        // models
        var db = server.plugins['hapi-sequelize'].db;

        for (var attr in db.sequelize.models) {
          if (db.sequelize.models[attr] && db.sequelize.models[attr].associate) {
              db.sequelize.models[attr].associate(db.sequelize.models);
          }
        }

        var force = config.FORCE_SYNC;
        db.sequelize.sync({ force: force }).then(function() {
        console.log('models synced');

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
            validateFunc: function (request, session, callback) {
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
    }
);
});
