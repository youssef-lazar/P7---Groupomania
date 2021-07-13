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
  Post.findOne({
    where: {
      id: req.params.id
    }
  }).then((post) => {
    if (req.userId == req.params.id || req.userRole === 1) {
      post.text = postObject.post.text;
      post.imageUrl = postObject.post.imageUrl;
    }
    post.save()
      .then((e) => {
        res.status(200).json({
          message: 'Post modifié !'
        })
      })
      .catch(error => res.status(400).json({
        error
      }));
  });
};


exports.deletePost = (req, res, next) => {

  const Post = models.Post;

  Post.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then(post => {
      if (req.userId == req.params.id || req.userRole === 1) {

        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          post.destroy({
              id: req.params.id,
            })
            .then(() => res.status(200).json({
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

  Post.findOne({
    where: {
      id: req.params.id
    }

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

  // TODO gerer une pagination

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
        model: Comment
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


exports.modifyComment = (req, res, next) => {

  const Comment = models.Comment;

  console.log(req.params)

  const commentObject = req.body.comment;
  Comment.findOne({
    where: {
      id: req.params.id
    }
  }).then((comment) => {
    if (req.userId == req.params.id || req.userRole === 1) {
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


/*exports.modifyComment = (req, res, next) => {
    
    const Comment = models.Comment;

    const newComment = req.body.message;
    const commentId = req.body.commentId;

    //TODO Check right User
    
    Comment.update(
        { message: newComment },
        { where: { id: commentId } }
    )
        .then(response => {
            if (response[0] > 0) {
                res.status(200).json({ message: 'Commentaire mis à jour' });
            } else {
                res.status(400).json({ error: "Ce commentaire n'existe pas" });
            }
        })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
}*/


exports.deleteComment = (req, res, next) => {

    const Comment = models.Comment;

    Comment.destroy({
        where: { id: req.params.id }
    })
        .then(response => {
            if (response > 0) {
                console.log(response);
                res.status(200).json({ message: "Le commentaire a été supprimé" });
            } else {
                res.status(400).json({ error: "Ce commentaire n'existe pas" });
            }
        })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
};