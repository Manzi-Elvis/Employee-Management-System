const Department = require('../models/Department');
exports.createDepartment = async (req, res) => {
      try {
            const { department_name } = req.body;
            if (!department_name) return res.status(400).json({ success: false, error: 'department_name required' });
            const existing = await Department.findOne({ department_name });
            if (existing) return res.status(400).json({ success: false, error: 'Department already exists' });
            const department = await Department.create({ department_name });
            res.json({ success: true, data: department });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
    }
};
exports.getDepartments = async (req, res) => {
      try {
            const departments = await Department.find().sort({ department_name: 1 });
            res.json({ success: true, data: departments });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.getDepartment = async (req, res) => {
      try {
            const department = await Department.findById(req.params.id);
            if (!department) return res.status(404).json({ success: false, error:'Department not found' });
            res.json({ success: true, data: department });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.updateDepartment = async (req, res) => {
      try {
            const department = await Department.findByIdAndUpdate(req.params.id, {
            department_name: req.body.department_name }, { new: true });
            if (!department) return res.status(404).json({ success: false, error: 'Department not found' });
            res.json({ success: true, data: department });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.deleteDepartment = async (req, res) => {
      try {
            const department = await Department.findByIdAndDelete(req.params.id);
            if (!department) return res.status(404).json({ success: false, error:'Department not found' });
            res.json({ success: true, data: 'Department deleted' });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};