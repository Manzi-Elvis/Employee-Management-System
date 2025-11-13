const express = require('express');
const router = express.Router();
const Department = require('../Models/Department');

// Get all departments
router.get('/' , async (req, res) => {
      try{
            const departments = await Department.find();
            res.json({success: true, data: departments});
      }
      catch(err){
            res.status(500).json({success: false, message: err.message});
      }
});

// Adding a department
router.post('/' , async (req, res) => {
      try{
            const department = new Department(req.body);
            await department.save();
            res.json({success: true, message: 'Department added successfully', data: department});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});

// Editing a department
router.put('/:id' , async (req, res) => {
      try{
            const department = await Department.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!department){
                  return res.status(404).json({success: false, message: 'Department not found'});
            }
            res.json({success: true, message: 'Department updated successfully!!!!!!!!', data: department});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});
// Deleting a department
router.delete('/:id' , async (req, res) => {
      try{
            await Department.findByIdAndDelete(req.params.id);
            res.json({success: true, message: 'Department deleted successfully'});
      }
      catch(err){
            res.status(400).json({success: false, message: err.message});
      }
});
module.exports = router;