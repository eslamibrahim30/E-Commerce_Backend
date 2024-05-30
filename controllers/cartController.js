const Cart = require('../models/Cart');
const Product = require('../models/BaseProduct');

// Add item to cart
const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(item => item.productId == productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  res.send(cart);
};

// Get cart items
const getCartItems = async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  res.send(cart);
};

// Remove item from cart
const removeItemFromCart =  async (req, res) => {
  const { userId, productId } = req.body;
  let cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter(item => item.productId != productId);
  await cart.save();
  res.send(cart);
};

module.exports = {
    addItemToCart,
    getCartItems,
    removeItemFromCart,
};
