const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            userRole: user.isAdmin
        },
        process.env.JWT,
        { expiresIn: '24h' }
    );
}
