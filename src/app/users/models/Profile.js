'use strict';
import Database from '../../../database/Database';

class Profile {

	constructor() {
		this.table = 'tableapplicants';
		this.user = Database;
	}
	
	findById(id) {
		return this
			.user
			.where({ id })
			.select()
			.from(this.table)
			.first()
	}
}

export default new Profile();