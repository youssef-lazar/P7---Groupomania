const express = require('express');  // Useful to create Express applications
const bodyParser = require('body-parser'); // Useful to transform requests body to JSON (ie usable JS objets)

const app = express();

// Database connection
const { sequelize } = require('./models/index');

// Configures specific response object headers to avoid CORS errors (middleware applied to all routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});
// Middlewares applied to all routes
app.use(bodyParser.json());


// Test database connection
const testDatabaseConnection = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la BDD réussie !');
    } catch (error) {
        console.error('Impossible de se connection à la BDD', error);
    }
};
testDatabaseConnection();

module.exports = app;