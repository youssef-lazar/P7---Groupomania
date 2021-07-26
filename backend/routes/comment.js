const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

/*ajouter les routes */

router.get('/:id', auth.checkToken, commentCtrl.getOneComment);
router.delete('/:id', auth.checkToken, commentCtrl.deleteComment);
router.put('/:id', auth.checkToken, commentCtrl.modifyComment);

module.exports = router;