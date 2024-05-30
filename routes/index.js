const express = require('express');
const router = express.Router();
const { authcheck } = require('../middlewares/auth'); 
const { createUser, updateUser, deleteUser, getUsers, loginUser } = require('../controllers/userController');
const { addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/cartController');
const { createOrder, getOrdersByUser } = require('../controllers/orderController');
const { createProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');

router.post('/user/create', createUser);
router.post('/login', loginUser);
router.get('/users', authcheck, getUsers);
router.put('/user/update', authcheck, updateUser);
router.delete('/user/delete', authcheck, deleteUser);

router.post('/product/create', createProduct);
router.get('/products', getProducts);
router.put('/product/update', updateProduct);
router.delete('/product/delete', deleteProduct);

router.post('/cart/add', authcheck, addItemToCart);
router.get('/cart/items', authcheck, getCartItems);
router.post('cart/remove', authcheck, removeItemFromCart);

router.post('/order/create', authcheck, createOrder);
router.get('/orders', authcheck, getOrdersByUser);


module.exports = router;
