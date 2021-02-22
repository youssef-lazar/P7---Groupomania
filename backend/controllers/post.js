const fs = require('fs');
const models = require('../models');

exports.createPost = (req, res, next) => {

  const postObject = req.body.post;
  delete postObject._id;
  const post  = new  models.Post({
    ...postObject
   // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({
      message: 'Post publié !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};


exports.modifyPost = (req, res, next) => {

  const Post = models.Post;

  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  };
  Post.updateOne({
      _id: req.params.id,
      userId: req.userId
    }, {
      ...postObject
    })
    .then(() => res.status(200).json({
      message: 'Post modifié !'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};


exports.deletePost = (req, res, next) => {

  const Post = models.Post;

  Post.findOne({
      _id: req.params.id,
      userId: req.userId
    })
    .then(post => {

      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({
            _id: req.params.id,
            userId: req.userId
          })
          .then(() => res.status(200).json({
            message: 'Post supprimé !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};


exports.getOnePost = (req, res, next) => {

  const Post = models.Post;

  Post.findOne({
    _id: req.params.id
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

  Post.findAll().then(
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