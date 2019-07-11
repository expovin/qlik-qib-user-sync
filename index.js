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

pool.connect()
    .then(client => {
		
		const qrs = new qrsInteract(extend({}, config.qrsApi));

        qrs
            .Get('user/full')
            .then((r) => r.body)
			.then((users) => users.filter(user => config.userFilter(user)))
            .then((users) => users.map(user => ({
				directory: config.getUserDirectory(user),
                id: config.getUserId(user),
                name: config.getUserName(user),
                email: config.getUserEmail(user),
            })))
            .then((qsUsers) => {
                return pool.query("select *, domain, username, display_name, email from users")
					.then((result) => result.rows)
					.then((qibUsers) => qibUsers.map(qibUser => `${qibUser.domain}\\${qibUser.username}`.toLowerCase()))
					.then((qibUsers) => qsUsers.filter(qsUser => qibUsers.indexOf(`${qsUser.directory}\\${qsUser.id}`.toLowerCase()) === -1))
					
            })
            .then((users) => {
				return Promise.all(users.map(user => {
					const text = 'INSERT INTO users(domain, username, display_name, email, stream, is_admin, is_active) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
					const values = [user.directory, user.id, user.name, user.email, '', false, true];

					return pool.query(text, values);
				}))
			})
			.finally(() => client.release())
            .then((users) => console.log(`Inserted ${users.length} users!`))
		
		
    });