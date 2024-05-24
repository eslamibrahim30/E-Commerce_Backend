const express = require('express');
const router = express.Router();
const authcheck = require('../middlewares/auth');
const { createUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/users', async () => {
  authcheck, createUser
});
router.put('/update', async () => {
  authcheck, updateUser
});
router.delete('/delete', async (req, res) => {
  authcheck, deleteUser;
});
module.exports = router;
