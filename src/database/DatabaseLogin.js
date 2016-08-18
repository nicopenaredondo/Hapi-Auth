'use strict';

import Knex from 'knex';
import config from '../../config.json';

const { host, port, database, user, password } = config.database.login_mysql;

export default Knex({
	client: 'mysql',
	connection: {
		host: host,
		port: port,
		database: database,
		user: user,
		password: password,
	}
})