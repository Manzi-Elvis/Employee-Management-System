const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors')
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const deptRoutes = require('./routes/departments');
const empRoutes = require('./routes/employees');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/departments', deptRoutes);
app.use('/api/employees', empRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
      app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
      });
}
).catch(err => {
      console.error('Failed to connect to database', err);
});

module.exports = app;