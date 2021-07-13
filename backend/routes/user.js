const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
/*ajouter les routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth.checkToken, userCtrl.getOneUser);
router.get('/', auth.checkToken, auth.checkSpecialAuthorization, userCtrl.getAllUsers);
router.delete('/:id', auth.checkToken, userCtrl.deleteUser);
router.put('/:id', auth.checkToken, userCtrl.modifyUser);

module.exports = router;