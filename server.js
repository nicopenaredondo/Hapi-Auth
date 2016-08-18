'use strict';

import Hapi from 'hapi';
import Glue from 'glue';
import _ from 'lodash';

import manifest from './manifest.json';

let options = { relativeTo: __dirname + '/src/app' };

Glue.compose(manifest, options, (err, server) => {
	server.start(err => {
		_.forEach(server.connections, function(connection) {
        console.log('Server started at: ' + connection.info.uri);
    });
	});

});

