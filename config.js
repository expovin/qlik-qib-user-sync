const path = require('path');

export default {
    hostname: 'https://localhost',
    portNumber: '42420',
    certificates: {
        certFile: path.resolve(__dirname, 'certs', 'client.pem'),
        keyFile: path.resolve(__dirname, 'certs', 'client_key.pem')
    },
    getUserId: (userFull) => userFull.id,
    getUserDirectory: (userFull) => userFull.userDirectory,
    getUserName: (userFull) => userFull.name,
    getUserEmail: (userFull) => userFull.name,
    userFilter: (userFull) => userFull.userDirectory === 'OKTA',
}