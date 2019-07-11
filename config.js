const path = require('path');

module.exports = {
    qrsApi: {
        hostname: 'https://win2.qfp.qlik.com',
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
    getUserId: (userFull) => userFull.userId,
    getUserDirectory: (userFull) => userFull.userDirectory,
    getUserName: (userFull) => userFull.userId.split('@')[0].split('.').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' '),
    getUserEmail: (userFull) => userFull.userId,
    userFilter: (userFull) => userFull.userDirectory === 'AUTH0',
}