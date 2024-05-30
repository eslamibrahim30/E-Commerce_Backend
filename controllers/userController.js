const User = require('../models/User');
const { authcheck } = require('../middlewares/auth');
const bcrypt = require('bcryptjs');

const handlserrors = (error) => {
  if (error.code === 11000) {
    rerurn('email Already exit')
  }
  throw(error.message);
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Missing name' });
    }
    if (!email) {
        res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
        res.status(400).json({ error: 'Missing password' });
    }
    const user1 = await User.findOne({ email });
    if (user1) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({ id: user._id, email: user.email, name: user.name});
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: handlserrors(error) });
  }
};

// User login
const loginUser = async (req, res) => {
  if (authcheck) {
    const { email, password } = req.body;
    if ( !password || !email) {
      return res.status(400).json({
        message: 'missing data',
      })
    }
    const loginuser = await User.findOne({ email }).select('password');
    if (!loginuser) {
      res.status(400).json({ error: 'User not found' });
    };
    if (loginuser) {
      const comp = await bcrypt.compare(password, loginuser.password);
      if (comp) {
        res.status(200).json({ message: 'Login successful', loginuser });
      } else {
        res.status(400).json({ message: 'password not match' });
      }
    }
  };
};


// Update user by ID
const updateUser = async (req, res) => {
  if (authcheck) {
    const { id, email, newData } = req.body
    if (!newData) {
      return res.status(400).json({ error: 'User ID and new data are required' });
    }
    const user = await User.findOneAndUpdate({ _id: id }, email, newData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return user;
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  if(authcheck) {
    const { _id, email } = req.body
    if (!_id || !email) {
      return res.status(400).json({ error: 'User ID and email are required' });
    }
    const deluser = await User.findOne({ _id, email });
    if (!deluser) {
      return res.status(400).json({ error: 'User not found' });
    };
    if (deluser) {
      await User.deleteOne(deluser);
      res.status(201).send({ message: 'User successfully deleted' })
    };
  };
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
};
