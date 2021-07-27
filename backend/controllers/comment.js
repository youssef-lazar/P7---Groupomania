const fs = require('fs');
const models = require('../models');


exports.addComment = (req, res, next) => {

  const Comment = models.Comment;

  const PostId = req.params.id;
  const comment = req.body.comment;

  Comment.create({
      UserId: req.userId,
      PostId: PostId,
      message: comment.message

    }).then(() => res.status(201).json({
      message: "Votre commentaire a été publié"
    }))
    .catch(error => res.status(500).json({
      error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
    }))
}

exports.getOneComment = (req, res, next) => {

  const Comment = models.Comment;
  const User = models.User;

  Comment.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User
    }, ]

  }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifyComment = (req, res, next) => {

  const Comment = models.Comment;
  const commentObject = req.body.comment;

  Comment.findOne({
    where: {
      id: req.params.id
    }
  }).then((comment) => {
    if (req.userId == comment.UserId || req.userRole === 1) {
      comment.message = commentObject.message;
    }
    comment.save()
      .then((e) => {
        res.status(200).json({
          message: 'Commentaire modifié !'
        })
      })
      .catch(error => res.status(400).json({
        error
      }));
  });
}

exports.deleteComment = (req, res, next) => {

  const Comment = models.Comment;

  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(response => {
      if (req.userId == comment.UserId || req.userRole === 1) {
        if (response > 0) {
          res.status(200).json({
            message: "Le commentaire a été supprimé"
          });
        } else {
          res.status(400).json({
            error: "Ce commentaire n'existe pas"
          });
        }
      }
    })
    .catch(error => res.status(500).json({
      error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
    }))
};