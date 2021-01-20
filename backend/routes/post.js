const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');


const auth = require('../middleware/auth');
/*ajouter les routes */

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;