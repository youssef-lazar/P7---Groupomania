const http = require('http');
const app = require('./app');
const db = require("./models");


/*
 This function returns a valid port, whether supplied as a number or a string
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); // Sets on which port the express app should run (the port 3000 by default OR the one specified by the environment if any)
/*
This function searches for various server errors and handle them appropriately
 */
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

db.sequelize.sync().then(function() {
    server.on('error', errorHandler);
    server.on('listening', () => { // Indicates in the console on which port the server is listening
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
        console.log('Listening on ' + bind);
    });
    server.listen(port); // The server listens on the port 3000 (by default) or on the one specified by the environment if any
})
