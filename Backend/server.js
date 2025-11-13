const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors')
const departmentRoutes = require('./Routes/departmentRoutes')
const employeeRoutes = require('./Routes/employeeRoutes')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const db = mongoose.connect(process.env.MONGO_URL)