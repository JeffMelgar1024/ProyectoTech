const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const verifyToken = require('../middlewares/verifyToken');


router.get('/all/:limit/:page', verifyToken.verifyToken, userController.getUsers);

router.get('/one/:id', verifyToken.verifyToken, userController.getOneUser);

router.post('/create', verifyToken.verifyToken, userController.postCreateUser);

router.delete('/delete/:id', verifyToken.verifyToken, userController.deleteUser);

router.put('/update/:id', userController.UpdateUser);

module.exports = router;