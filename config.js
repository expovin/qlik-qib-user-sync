const path = require('path');

module.exports = {
    qrsApi: {
		hostname: 'https://localhost',
		portNumber: '4242',
		certificates: {
			certFile: path.resolve(__dirname, 'certs', 'client.pem'),
			keyFile: path.resolve(__dirname, 'certs', 'client_key.pem')
		},
	},
	pg: {
		hostname: 'localhost',
		portNumber: '5432',
		database: 'qlikinsightbot',
		
	},
    getUserId: (userFull) => userFull.name,
    getUserDirectory: (userFull) => userFull.userDirectory,
    getUserName: (userFull) => userFull.name.split('@')[0].split('.').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' '),
    getUserEmail: (userFull) => userFull.name,
    userFilter: (userFull) => userFull.userDirectory === 'OKTA',
}