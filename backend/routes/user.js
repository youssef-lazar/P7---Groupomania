const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
/*ajouter les routes */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);
router.delete('/me', auth, userCtrl.deleteUser);
router.put('/me', auth, userCtrl.modifyUser);

module.exports = router;