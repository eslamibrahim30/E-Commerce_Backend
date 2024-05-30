const express = require('express');
const dotenv = require('dotenv').config();
const router = require('./routes');
const cookieParser = require('cookie-parser')

const connectDB = require('./utils/db');

const app = express();

const port = process.env.PORT || 4000;
const host = process.env.DB_HOST || 'localhost';
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', router);
if (connectDB()) {
  app.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
