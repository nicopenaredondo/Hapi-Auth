import AuthGateway from '../gateways/AuthGateway';
import Boom from 'boom';

class AuthController {

  process(request, reply){

    const { email, password } = request.payload;
    const badData = Boom.unauthorized('Invalid Email or Password');

    if(!email && !password){
      reply(badData);
    }

    AuthGateway.attempt(email, password)
	    .then(item => {
	      reply(item);
	    }) 
	    .catch(() => {
	      reply(badData);
	    });
  }

}
export default new AuthController();