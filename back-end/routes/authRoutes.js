const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

router.use('/admin', authController.checkAdmin);

router.post('/admin/add-user', authController.addUser);
router.put('/admin/update-user/:id', authController.updateUser);
router.delete('/admin/delete-user/:id', authController.deleteUser);

module.exports = router;