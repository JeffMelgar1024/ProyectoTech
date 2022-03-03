const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const verifyToken = require('../middlewares/verifyToken');

router.get('/all/:limit/:page',verifyToken.verifyToken, productController.getAllProducts);

router.get('/one/:id',verifyToken.verifyToken, productController.getProduct);

router.post('/create', verifyToken.verifyToken, productController.createProduct);

router.put('/update/:id', verifyToken.verifyToken, productController.updateProduct);

router.delete('/delete/:id', verifyToken.verifyToken, productController.deleteProduct);

router.get('/find/:type/:name', verifyToken.verifyToken, productController.findProduct);

module.exports = router;