require('dotenv').config();
require('reflect-metadata');

const express = require('express'); 
const dataSource = require("./db/db");
const routes = require('./routes/routes');
const app = express();
const morgan = require('morgan');
const logger = require('./utils/logger');
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors({
  origin: '*', // dev mode me sab allow
  credentials: true
}));
// Middleware
app.use(express.json());

// ===== Morgan HTTP Logger =====
// 1) Terminal pe colorful request log (Morgan ka apna style)
app.use(morgan('tiny'));

// 2) Saath me Morgan ka output Winston me bhi bhejna (file save ke liye)
// app.use(morgan('combined', {
//   stream: {
//     write: (message) => logger.info(message.trim())
//   }
// }));

// Test route
app.get("/", (req, res) => {
  res.send("Express server working");
});

dataSource.initialize()
  .then(() => {
    console.log("Database connected");

    // Routes
    app.use('/api/routes', routes);

    // Error-handling middleware
    app.use((err, req, res, next) => {
      logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      res.status(err.status || 500).json({ error: err.message });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });
