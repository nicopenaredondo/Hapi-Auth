import MainController from './controllers/MainController';
import User from '../users/models/User';

const controller = new MainController();

exports.register = function (server, options, next) {
 
  server.route({
    path: '/',
    method: 'GET',
    config: {
    	auth: false
    },
    handler: controller.index
  });

  server.route({
    path: '/token-required',
    method: 'GET',
    config: {
    	auth: 'token'
    },
    handler: function(request, reply){
    	var userId = request.auth.credentials.sub;
    	User.findById(userId).then(account => {
    		reply(account);
	    })
	    .catch(() => {
	    	reply('not found');
	    });
    }
  });

  next();
 
};
 
exports.register.attributes = {
  pkg: require('./package.json')
};