require('dotenv').config();
const express = require('express')
const connectDB = require('./config/database');
const expressConfig = require('./config/express');
const routes = require('./routes');

const app = express()
const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connectDB()
  } catch (error) {
    throw new Error('db not connected')
  }

  expressConfig(app);
  routes(app);

  console.log(`App running on port ${port}`)
})