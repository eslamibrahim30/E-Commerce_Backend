const express = require('express');

const router = express.Router();
const { verifyAdmin, authcheck } = require('../middlewares/auth');
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  loginUser,
} = require('../controllers/userController');

router.post('/users', createUser);
router.post('/login', loginUser);
router.get('/users', verifyAdmin, getUsers);
router.put('/update', authcheck, updateUser);
router.delete('/delete', authcheck ,deleteUser);

module.exports = router;
