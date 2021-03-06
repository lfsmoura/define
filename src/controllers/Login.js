let uuid = 1;

module.exports = [{
  method: ['GET', 'POST'],
  path: '/login/facebook',
  config: {
    auth: {
        strategy: 'facebook',
        mode: 'try'
    },
    handler: function(request, reply) {
      if (!request.auth.isAuthenticated) {
        return reply('Authentication failed due to: ' + request.auth.error.message);
      }
      console.log(request.auth.credentials);
      const account = request.auth.credentials.profile;

      const sid = String(++uuid);
      request.server.app.cache.set(sid, { account }, 0, (err) => {
        if (err) {
            reply(err);
        }
        request.cookieAuth.set({ sid: sid });
        return reply.redirect('/');
      });
    }
  }
},{
  method: 'GET',
  path: '/login/fake/{id}',
  config: {
      auth: { mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
      handler(request, reply) {
        const account = {
          displayName: 'Fake',
          id: request.params.id || '100002403759483'
        };
        const sid = String(++uuid);
        request.server.app.cache.set(sid, { account }, 0, (err) => {
          if (err) {
              reply(err);
          }
          request.cookieAuth.set({ sid: sid });
          return reply.redirect('/');
        });
      }
  }
},{
  method: 'GET',
  path: '/logout',
  handler(request, reply) {
    request.cookieAuth.clear();
    return reply.redirect('/');
  }
},{
  method: 'GET',
  path: '/login',
  config: {
    handler(request, reply) {
      return reply('<a href="/login/facebook"> Login com facebook </a>');
    },
    auth: { mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } }
  }
}];
