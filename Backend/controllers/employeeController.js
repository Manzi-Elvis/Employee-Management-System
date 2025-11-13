const Employee = require('../models/Employee');
const Department = require('../models/Department');
// pagination page size
const PAGE_SIZE = 5;
exports.createEmployee = async (req, res) => {
      try {
            const { name, email, department_id } = req.body;
            if (!name || !email || !position || salary == null || !department_id){
                  return res.status(400).json({ success: false, error: 'Missing required fields' });
            }
            const dept = await Department.findById(department_id);
            if (!dept) return res.status(400).json({ success: false, error: 'Invalid department' });
            const existing = await Employee.findOne({ email });
            if (existing) return res.status(400).json({ success: false, error: 'Employee with email already exists' });
            const employee = await Employee.create({ name, email, department_id });
            res.json({ success: true, data: employee });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.getEmployees = async (req, res) => {
      try {
            const page = parseInt(req.query.page, 10) || 1;
            const skip = (page - 1) * PAGE_SIZE;
            const [employees, total] = await Promise.all([
                  Employee.find()
                  .populate('department_id', 'department_name')
                  .sort({ createdAt: -1 })
                  .skip(skip)
                  .limit(PAGE_SIZE),
                  Employee.countDocuments()
            ]);
            res.json({ success: true, data: { employees, page, pageSize: PAGE_SIZE, total } });
            } catch (err) {
                  res.status(500).json({ success: false, error: 'Server error' });
            }
};
exports.getEmployee = async (req, res) => {
      try {
            const employee = await
            Employee.findById(req.params.id).populate('department_id', 'department_name');
            if (!employee) return res.status(404).json({ success: false, error:'Employee not found' });
            res.json({ success: true, data: employee });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.updateEmployee = async (req, res) => {
      try {
            const updates = {};
            const allowed = ['name', 'email', 'position', 'salary', 'department_id'];
            allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] =
            req.body[k]; });
            if (updates.department_id) {
                  const dept = await Department.findById(updates.department_id);
                  if (!dept) return res.status(400).json({ success: false, error: 'Invalid department' });
            }
            const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {new: true }).populate('department_id', 'department_name');
            if (!employee) return res.status(404).json({ success: false, error:'Employee not found' });
            res.json({ success: true, data: employee });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.deleteEmployee = async (req, res) => {
      try {
            const employee = await Employee.findByIdAndDelete(req.params.id);
            if (!employee) return res.status(404).json({ success: false, error:'Employee not found' });
            res.json({ success: true, data: 'Employee deleted' });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};

exports.getEmployeesByDepartment = async (req, res) => {
      try {
            const { departmentId } = req.params;
            const page = parseInt(req.query.page, 10) || 1;
            const skip = (page - 1) * PAGE_SIZE;
            const dept = await Department.findById(departmentId);
            if (!dept) return res.status(404).json({ success: false, error: 'Department not found' });
            const [employees, total] = await Promise.all([
                  Employee.find({ department_id: departmentId }).populate('department_id', 'department_name').skip(skip).limit(PAGE_SIZE), Employee.countDocuments({ department_id: departmentId })
            ]);
            res.json({ success: true, data: { employees, page, pageSize: PAGE_SIZE, total, department: dept.department_name } });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};