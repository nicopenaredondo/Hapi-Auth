import AuthController from './controllers/AuthController';

exports.register = function (server, options, next) {
 
  server.route({
    path: '/',
    method: 'POST',
    config: {
    	auth: false
    },
    handler: AuthController.process
  });

  next();
 
};
 
exports.register.attributes = {
  pkg: require('./package.json')
};