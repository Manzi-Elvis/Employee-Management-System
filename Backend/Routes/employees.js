const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/employeeController');

router.use(auth);

router.post('/', controller.createEmployee);
router.get('/', controller.getEmployees);
router.get('/:id', controller.getEmployee);
router.put('/:id', controller.updateEmployee);
router.delete('/:id', controller.deleteEmployee);

// Extra task: list employees by department id with pagination
router.get('/by-department/:departmentId', controller.getEmployeesByDepartment);

module.exports = router;