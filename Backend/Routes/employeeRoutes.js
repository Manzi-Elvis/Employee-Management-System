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
//Update an employee(e.g salary, position, department)
router.put('/:id' , async(req, res) => {
      try{
            const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!employee){
                  return res.status(404).json({success: false, message: 'Employee not found'});
            }
            res.json({success: true, message: 'Employee updated successfully', data: employee});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});
//Delete an employee
router.delete('/:id' , async(req, res) => {
      try{
            await Employee.findByIdAndDelete(req.params.id);
            res.json({success: true, message: 'Employee deleted successfully'});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});

// Get employees by department
router.get('/department/:deptId' , async(req, res) => {
      try{
            const employees = await Employee.find({department_id: req.params.deptId}).populate('department_id', 'department_name');
            res.json({success: true, data: employees });
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});

module.exports = router;