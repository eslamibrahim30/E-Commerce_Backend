const express = require('express');
const router = express.Router();
const { authcheck } = require('../middlewares/auth'); 
const { createUser, updateUser, deleteUser, getUsers, loginUser } = require('../controllers/userController');

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/update', authcheck, updateUser);
router.delete('/delete', authcheck, deleteUser);

module.exports = router;
