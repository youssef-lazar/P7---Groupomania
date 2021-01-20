const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validator = require('validator');


function isValid(email) {
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push('Email not valid');
  }
  return errors;
}

exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });

      let errors = isValid(req.body.email);
      if (errors.length > 0) {
        return res.status(400).json({
          errors
        });
      } else {

        user.save()
          .then(() => res.status(201).json({
            message: 'Utilisateur créé !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      }
    })
    .catch(error => res.status(500).json({
      error
    }));
};




exports.login = (req, res, next) => {

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !'
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({
                userId: user._id
              },
              process.env.JWT, {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};


exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.getAllUsers = (req, res, next) => {
  User.find().then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteUser = (req, res, next) => {
  req.model.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      if (req.userId == req.params.id) {
        user.destroy()
          .then(() => res.status(200).json({
            message: 'Utilisateur supprimé'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      } else {
        res.status(400).json({
          message: 'error'
        })
      }
    })
};