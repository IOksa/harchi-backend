const express = require('express');
const ctrl = require('../../controllers/users');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/statistics', authenticate, ctrl.getStatistics);
router.get('/comments', authenticate, ctrl.getLastComments);

router.patch('/password', authenticate, ctrl.changePassword);
router.patch('/email', authenticate, ctrl.changeEmail);
router.patch('/username', authenticate, ctrl.changeUsername);
router.patch('/avatar', authenticate, ctrl.addAvatar);
router.patch('/slogan', authenticate, ctrl.changeSlogan);

router.delete('/avatar', authenticate, ctrl.removeAvatar);
router.delete('/account', authenticate, ctrl.removeAccount);

module.exports = router;
