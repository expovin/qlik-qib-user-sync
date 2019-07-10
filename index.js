const qrsInteract = require('qrs-interact');
const config = require('./config');
const extend = require('extend');

const { Pool  } = require('pg');
const pool = new Pool()

const qrs = new qrsInteract(extend({}, config));

pool.connect()
    .then(client => {
        qrs
            .Get('user/full')
            .then((r) => r.body)
            .then((users) => users.filter(user => user.userDirectory === 'OKTA'))
            .then((users) => users.map(user => ({
                id: config.getUserId(user),
                directory: config.getUserDirectory(user),
                name: config.getUserName(user),
                email: config.getUserEmail(user),
            })))
            .then((users) => {
                const text = 'SELECT id, name, email, directory FROM users'

                return pool.query(text)
                    .then((previousUsers) => previousUsers.map(previousUser => previousUser.id))
                    .then((previousUsers) => users.filter(user => previousUsers.indexOf(user.id) > -1))
            })
            .then((users) => Promise.all(users.map(user => {
                const text = 'INSERT INTO users(name, email, directory) VALUES($1, $2, $3) RETURNING *'
                const values = [user.name, user.userId, user.userDirectory]

                return pool.query(text, values);
            })))
            .then(console.log)
            .finally(() => client.release())
    });



