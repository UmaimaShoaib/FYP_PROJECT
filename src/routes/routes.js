const express = require('express');
const router = express.Router();
const {signup,login } = require('../controllers/usercontroller');
const verifyToken = require("../verifytoken/verify");

router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, user: req.user });
});


module.exports = router;

