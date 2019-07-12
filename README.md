# qlik-qib-user-sync

Synchronizes QIB users from Qlik Sense using QRS API

## Usage

```js
npm install qlik-qib-user-sync
```

Update config.js to set the getUser* functions correctly

Add a certs folder in home directory with client.pem and client_key.pem exported from your Qlik Sense QMC

Add a config-secret.js file in home directory with QIB postgres user & password

```js
module.exports = {
    pg: {
        user: 'postgres',
        password: '1337',
    },
}
```

start with

```js
npm start
```