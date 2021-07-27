const fs = require('fs');
const models = require('../models');

exports.createPost = (req, res, next) => {

  const post = new models.Post({
    text: req.body.text,
    UserId: req.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  post.save()
    .then(() => res.status(201).json({
      message: 'Post publié !',
      postId: post.id
    }))
    .catch(error => res.status(400).json({
      error
    }));

};


// Modification de la publication sélectionnée
exports.modifyPost = (req, res, next) => {

  const Post = models.Post;

  Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(post => {
      if (req.userId == post.UserId || req.userRole === 1) {
        const dataToUpdate = {
          text: req.body.text
        }
        if (req.file) {
          dataToUpdate.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        Post.update(dataToUpdate, {
            where: {
              id: req.params.id
            }
          })
          .then((response) => res.status(200).json({
            response: " Publication modifiée avec succès !"
          }))
          .catch((err) => res.status(401).json({
            err
          }))
      } else {
        return res.status(403).json({
          'error': 'UnAuthorize'
        });
      }
    })
    .catch((error) => res.status(500).json({
      error
    }))
};


exports.deletePost = (req, res, next) => {

  const Post = models.Post;

  Post.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(post => {
      if (req.userId == post.UserId || req.userRole === 1) {

        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          post.destroy({
              where: {
                id: req.params.id
              }
            }).then(() => res.status(200).json({
              message: 'Post supprimé !'
            }))
            .catch(error => res.status(400).json({
              error
            }));
        });
      }
    })
    .catch(error => res.status(500).json({
      error
    }));
};


exports.getOnePost = (req, res, next) => {

  const Post = models.Post;
  const User = models.User;

  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User
    }, ]

  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.getAllPosts = (req, res, next) => {

  const Post = models.Post;
  const User = models.User;
  const Like = models.Like;
  const Comment = models.Comment;

  Post.findAll({

    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
        model: User
      },
      {
        model: Like
      },
      {
        model: Comment,
        include: [{
          model: User
        }]
      },
    ]
  }).then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.likePost = async (req, res, next) => {

  const Like = models.Like;
  const PostId = req.params.id;

  try {
    const previousLike = await Like.findOne({
      where: {
        UserId: req.userId,
        PostId: PostId
      }
    });

    if (!previousLike) {
      const response = await Like.create({
        UserId: req.userId,
        PostId: PostId
      });
      return res.status(201).json({
        message: "Votre like a été ajouté"
      });
    }

    if (previousLike) {
      await Like.destroy({
        where: {
          UserId: req.userId,
          PostId: PostId
        }
      });
      return res.status(200).json({
        message: "Votre like a été retiré"
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau"
    })
  }

}