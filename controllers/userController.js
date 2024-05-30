const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();

// Create a new user
const createUser = async (req, res) => {
    const {
        name,
        email,
        password,
        secretkey,
    } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
        res.status(400).json({ error: 'Missing password' });
    }
    if (!name) {
        res.status(400).json({ error: 'Missing password' });
    }
    const user1 = await User.findOne({ email });
    if (user1) {
        return res.status(400).json({ error: 'Email already exists', user1 });
    }
    if (secretkey === process.env.ADMIN_SECRET_KEY) {
        const admin = new User({
            name,
            email,
            password,
            role: 'admin',
        });
        await admin.save();
        // const token = await admin.generateAuthToken();
        return res.status(200).json({
            message: 'Admin created',
            id: admin._id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
        });
    } else {
        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        return res.status(200).json({
            message: 'User created',
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({
            message: 'missing data',
        });
    }
    const loginuser = await User.findOne({ email }).select('password').select('role');
    if (!loginuser) {
        res.status(400).json({ error: 'User not found' });
    }
    if (loginuser) {
        const comp = await bcrypt.compare(password, loginuser.password);
        if (comp) {
            const logintoken = await loginuser.generateAuthToken();
            res.status(200).json({ message: 'Login successful', role: loginuser.role, logintoken });
        } else {
            res.status(400).json({ message: 'password not match' });
        }
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    const { _id, email, newData } = req.body;
    if (!_id) {
        return res.status(400).json({ error: 'User ID are required' });
    }
    const user = await User.findOneAndUpdate({ _id, email }, newData, { new: true });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
};
// Delete user by ID
const deleteUser = async (req, res) => {
    const { _id, email } = req.body;
    if (!_id || !email) {
        return res.status(400).json({ error: 'User ID and email are required' });
    }
    const deluser = await User.findOne({ _id, email });
    if (!deluser) {
        return res.status(400).json({ error: 'User not found' });
    }
    // await User.deleteMany();
    // res.status(201).send({ message: 'cleared' })
    if (deluser) {
        await User.deleteOne(deluser);
        res.status(201).send({ message: 'User deleted' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
};
