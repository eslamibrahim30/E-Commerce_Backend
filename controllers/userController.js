const User = require('../models/User');

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Get all users
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Update user by ID
const updateUser = async (userId, newData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, newData, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};

// Delete user by ID
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};