'use strict';
import DatabaseLogin from '../../../database/DatabaseLogin';

class User {

	constructor() {
		this.table = 'users';
		this.user = DatabaseLogin;
	}
	
	all() {
		return this
			.user
			.select()
			.from(this.table);
	}

	findById(id){
		return this
			.user
			.where({ id })
			.select()
			.from(this.table)
			.first()
	}

	findByEmailPassword(email, password) {
		return this
			.user
			.where({ email })
			.andWhere({ password })
			.select()
			.from(this.table);
	}

	findByEmail(email) {
		return this
			.user
			.where({ email })
			.select()
			.from(this.table)
			.first()
	}
}

export default new User();