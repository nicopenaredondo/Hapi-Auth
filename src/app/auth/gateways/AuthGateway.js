import Bcrypt from 'bcrypt';
import Promise from 'promise';
import Jwt from 'jsonwebtoken';

import User from '../../users/models/User';
import Profile from '../../users/models/Profile';
import JwtConfig from '../../jwt/config/jwt';

class AuthGateway {

  attempt(email, password){
    let errorMessage = 'Unprocessable Entity';
    
    let promise = new Promise((resolve, reject) => {
      this._validateCredentials(email, password).then(data => {
        resolve(data);
      }).catch(reason => {
        reject(reason);
      })
    });

    return promise;
  }

  _validateCredentials(email, password)
  {

    let promise = new Promise((resolve, reject) => {
      User.findByEmail(email).then(user => {

        if(!user){
          reject(false)
        }
        this._comparePassword(user.password, password).then(() => {
          
          this._getProfileData(user.applicant_id).then(profile => {
            
            Object.assign(profile, {photo: ''});
            const token = this._generateToken(user);
            resolve({ data : { token } });

          }).catch(() => {
            reject(false);
          })
          
        }).catch(() => {
          reject(false);
        })
      })
    });

    return promise;
  }

  _getProfileData(applicantId) {
    let promise = new Promise((resolve, reject) => {
      Profile.findById(applicantId).then(profile => {
        if(!profile) {
          return reject(false)
        }
        resolve(profile);
      })
    })

    return promise;
  }

  _comparePassword(userPassword, inputPassword) {
    
    let promise = new Promise((resolve, reject) =>  {
      Bcrypt.compare(inputPassword, this._parsePassword(userPassword), (err, response) => {
        if(!response) {
          return reject(false)
        }
        resolve(true);
      })
    });

    return promise;
  }

  _parsePassword(password) {
    return password.replace('$2y$', '$2a$');
  }

  _generateToken(user){
    const payload = { sub: user.id };
    return Jwt.sign(payload, JwtConfig.secretKey,  JwtConfig.claims);
  }
}

export default new AuthGateway();