const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const models = require('../models');
const jwtUtils = require("../middleware/jwt");
require('dotenv').config();

function isValid(email) {
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push('Email not valid');
  }
  return errors;
}

exports.signup = async (req, res, next) => {

  const User = models.User;

  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (existingUser) {
      res.status(400).json({
        error: "Cette adresse email est déjà utilisée"
      });
    } else {

      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            surname: req.body.surname,
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
                message: 'Utilisateur créé !',
                email: req.body.email,
                firstName: req.body.firstName,
                surname: req.body.surname,
              }))
              .catch(error => res.status(400).json({
                error
              }));
          }
        })
        .catch(error => res.status(500).json({
          error
        }));
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};


exports.login = (req, res, next) => {

  const User = models.User;

  User.findOne({
      where: {
        email: req.body.email
      }
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
          return res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwtUtils.generateToken(user),
            firstName: user.firstName,
            surname: user.surname,
            bio: user.bio
          });
        })
        .catch(error => res.status(500).json({
          error: error
        }));
    })
    .catch(error => res.status(500).json({
      error: error
    }));
};


exports.getOneUser = (req, res, next) => {

  const User = models.User;

  User.findOne({
    where: {
      id: req.params.id
    }

  }).then(
    (user) => {
      if ((req.userId == req.params.id) || req.userRole === 1) {
        return res.status(200).json(user);
      } else {
        return res.status(403).json("");
      }
    }
  ).catch(
    (error) => {
      return res.status(400).json({
        error: error
      });
    }
  );
};


exports.getAllUsers = (req, res, next) => {

  const User = models.User;

  User.findAll().then(
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

  const User = models.User;

  User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      if (req.userId == req.params.id || req.userRole === 1) {
        user.destroy()
          .then(() => res.status(200).json({
            message: 'Utilisateur supprimé'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      } else {
        res.status(403).json({
          'error': 'UnAuthorize'
        })
      }
    })
};

exports.modifyUser = (req, res, next) => {

  const User = models.User;

  const userObject = req.file ? {
    ...JSON.parse(req.body.user),
  } : {
    ...req.body
  };

  User.findOne({
    where: {
      id: req.params.id
    }
  }).then((user) => {
    if (req.userId == req.params.id || req.userRole === 1) {

      user.firstName = userObject.user.firstName;
      user.surname = userObject.user.surname;
      user.photo = userObject.user.photo;
      user.bio = userObject.user.bio;
    } else {
      return res.status(403).json({
        'error': 'UnAuthorize'
      });
    }
    user.save()
      .then(() => res.status(200).json({
        user: user
      }))
      .catch(error => res.status(400).json({
        error
      }));
  });
};