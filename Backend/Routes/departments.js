const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/departmentController');

router.use(auth);

router.post('/', controller.createDepartment);
router.get('/', controller.getDepartments);
router.get('/:id', controller.getDepartment);
router.put('/:id', controller.updateDepartment);
router.delete('/:id', controller.deleteDepartment);

module.exports = router;