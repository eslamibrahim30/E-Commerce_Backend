import express from 'express';
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;
const host = process.env.DB_HOST || 'localhost';
app.use(express.json());

app.listen(port, host, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;
