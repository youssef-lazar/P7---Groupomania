const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
/*ajouter les routes */

router.get('/', auth.checkToken, postCtrl.getAllPosts);
router.post('/', auth.checkToken, multer, postCtrl.createPost);
router.get('/:id', auth.checkToken, postCtrl.getOnePost);
router.put('/:id', auth.checkToken, multer, postCtrl.modifyPost);
router.delete('/:id', auth.checkToken, postCtrl.deletePost);
router.post('/:id/like', auth.checkToken, postCtrl.likePost);

module.exports = router;