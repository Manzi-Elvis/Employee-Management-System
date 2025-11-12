const mongoose = require('mongoose');
const EmpSchema = new mongoose.Schemana({
      name: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          required: true,
          unique: true
      },
      position: {
            type: String,
      },
      salary: {
            type: Number,
      },
      departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
      }
});
module.exports = mongoose.model('Employee', EmpSchema);