const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
});
UserSchema.methods.comparePassword = function (candidate) {
      return bcrypt.compare(candidate, this.password);
};
module.exports = mongoose.model('User', UserSchema);