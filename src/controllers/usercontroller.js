const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dataSource = require("../db/db");
const { Teacher } = require('../entities/entity');
const logger = require('../utils/logger');
const userRepo = dataSource.getRepository(Teacher);

// ========== SIGNUP ==========
const signup = async (req, res) => {
  logger.info(`Signup request for email: ${req.body.email}`);

  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check for missing fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Create new user
    const newUser = userRepo.create({
      username,
      email,
      password: hashedPassword,
    });

    await userRepo.save(newUser);

    logger.info(`User registered successfully: ${req.body.email}`);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    logger.error(`Signup failed: ${err.message}`);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// ========== LOGIN ==========
const login = async (req, res) => {
  try {
   
    console.log(" Incoming login request body:", req.body);
    const { email, password } = req.body;

    // Find user
    const user = await userRepo.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Remove password before sending
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token + user object
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
};
