module.exports = [{
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply.file('./public/index.html');
    }
  },{
    method: 'GET',
    path: '/session',
    handler: function (request, reply) {
      reply(request.auth.credentials);
    }
  },{
    method: 'GET',
    path: '/{filename*}',
    handler: {
      file: function (request) {
        return './public/' + request.params.filename;
      }
    }
  }];
