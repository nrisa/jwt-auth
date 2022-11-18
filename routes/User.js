const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken.js");

// controllers
const { getUsers, Register, Login, Logout } = require("../controllers/User.js");
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
module.exports = router;