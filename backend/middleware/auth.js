const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT);
    const userId = decodedToken.userId;
    const userRole = decodedToken.userRole;
    if(userId){
      req.userId = userId;
      req.userRole = userRole;
      next();
    }else{
      throw 'Not authenticated'
    }    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

  exports.checkSpecialAuthorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;

        if ((req.body.userId && req.body.userId == userId) || userRole === 1 ) {
            next();
        } else {
            throw 'Forbidden request'
        }
    } catch(error) {
        res.status(403).json({ error: error.message });
    }
  }
