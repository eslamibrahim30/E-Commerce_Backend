const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Create order
const createOrder = async (req, res) => {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    const totalAmount = cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    const order = new Order({
        userId,
        items: cart.items,
        totalAmount
    });
    await order.save();
    await Cart.findOneAndDelete({ userId });
    res.send(order);
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('items.productId');
    res.send(orders);
};

module.exports = {
    createOrder,
    getOrdersByUser,
};
