const express = require('express');
const router = express.Router();
const { authcheck } = require('../middlewares/auth'); 
const { createUser, updateUser, deleteUser, getUsers, loginUser } = require('../controllers/userController');
const { addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/CartController');
const { createOrder, getOrdersByUser } = require('../controllers/orderController');

router.post('/user/create', authcheck, createUser);
router.post('/login', authcheck, loginUser);
router.get('/users', authcheck, getUsers);
router.put('/user/update', authcheck, updateUser);
router.delete('/user/delete', authcheck, deleteUser);
router.post('/cart/add', authcheck, addItemToCart);
router.get('/cart/items', authcheck, getCartItems);
router.post('cart/remove', authcheck, removeItemFromCart);
router.post('/order/create', authcheck, createOrder);
router.get('/orders', authcheck, getOrdersByUser);


module.exports = router;
