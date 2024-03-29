const express = require('express');  // Useful to create Express applications
const bodyParser = require('body-parser'); // Useful to transform requests body to JSON (ie usable JS objets)
const helmet = require("helmet");
const model = require('./models/index');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const path = require('path');

const app = express();

// Connexion à la base de données
require("./dbConnection");

// Configures specific response object headers to avoid CORS errors (middleware applied to all routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});

app.use(helmet());

app.use(function (req, res, next) {
   req.model = model;
    next();
});

// Middlewares applied to all routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);


module.exports = app;