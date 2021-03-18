const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    const userId = decodedToken.userId;
    if(userId){
      req.userId = userId;
      next();
    }else{
      throw 'Not authenticated'
    }    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};