const qrsInteract = require('qrs-interact');
const extend = require('extend');

const optionalRequire = require("optional-require")(require);

const config = extend(
	true,
	{},
	require('./config'),
	optionalRequire('./config-secret') || {}
);

const { Pool  } = require('pg');

const pool = new Pool({
	host: config.pg.hostname,
	port: config.pg.portNumber,
	database: config.pg.database,
	user: config.pg.user,
	password: config.pg.password,
})

/*
const qrs = new qrsInteract(extend({}, config.qrsApi));

        qrs
            .Get('user/full')
            .then((r) => r.body)
			.then((users) => users.filter(user => config.userFilter(user)))
            .then((users) => users.map(user => ({
                id: config.getUserId(user),
                directory: config.getUserDirectory(user),
                name: config.getUserName(user),
                email: config.getUserEmail(user),
            })))
			.then(console.log)
            .then((users) => {
				return false;
				
                const text = 'SELECT id, name, email, directory FROM users'

                //return pool.query(text)
                 //   .then((previousUsers) => previousUsers.map(previousUser => previousUser.id))
                 //   .then((previousUsers) => users.filter(user => previousUsers.indexOf(user.id) > -1))
            })
            .then((users) => {
				return false;
				
				Promise.all(users.map(user => {
					const text = 'INSERT INTO users(name, email, directory) VALUES($1, $2, $3) RETURNING *'
					const values = [user.name, user.userId, user.userDirectory]

					//return pool.query(text, values);
				}))
			})
            .then(console.log)

*/

pool.connect()
    .then(client => {
		return pool.query("select table_name from information_schema.tables where table_schema = 'public'")
			.then(console.log)
			.finally(() => client.release())
    });