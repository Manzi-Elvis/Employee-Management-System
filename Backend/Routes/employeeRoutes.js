const express = require('express');
const router = express.Router();
const emp = require('../Models/Employee');

// Get all employees(with department details)
router.get('/' , async(req, res) => {
      try{
            const employees = await Employee.find().populate('department_id', 'department_name');
            res.json({success: true, data: employees })
      }
      catch(err){
            res.status(500).json({success: false, message: err.message});
      }
      
});

//Add an employee
router.post('/' , async(req, res) => {
      try{
            const employee = new Employee(req.body)
            await employee.save();
            res.json({success: true, message: "Employee added Successfully", data: employee});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message });
      }
});