import JwtAuth from 'hapi-auth-jwt2';

import Config from './config/jwt';
import User from '../users/models/User';

var _validate = function (request, decodedToken, callback) {
		//check in the database if the "sub/id" payload exists in the database
 		var userId = decodedToken.sub;

    User.findById(userId).then(account => {
    	callback(null, true, account);
    })
    .catch(() => {
    	callback(null, false)
    });
    
};

exports.register = function (server, options, next) {
 	server.register(JwtAuth, function(){
 		server.auth.strategy('token', 'jwt', { 
	  	key: Config.secretKey,
	    validateFunc: _validate,
	    verifyOptions: Config.claims
	  });
 	});

 	server.auth.default({
  	strategy: 'token',
  });

 	next();
 
};
 
exports.register.attributes = {
  pkg: require('./package.json')
};

