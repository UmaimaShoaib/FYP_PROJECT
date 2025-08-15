const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
    req.user = decoded; // token ka payload request me attach kar diya
    next(); // next middleware/controller
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
