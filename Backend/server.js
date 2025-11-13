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
  .then(() => console.log('MongoDB CONNECTED!!!!!!!!!'))
  .catch(err => console.error(error))

app.use('./departments', departmentRoutes);
app.use('./employees', employeeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port: ${port}`))