const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
/*ajouter les routes */

router.delete('/:id', auth.checkToken, postCtrl.deleteComment);
router.put('/:id', auth.checkToken, postCtrl.modifyComment);

module.exports = router;