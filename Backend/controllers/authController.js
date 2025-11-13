const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
      try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password are required' });
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ success: false, error: 'User already exists' });
            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashed });
            res.json({ success: true, data: { id: user._id, email: user.email } });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
      }
};
exports.login = async (req, res) => {
      try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
            res.json({ success: true, data: { token } });
      } catch (err) {
            res.status(500).json({ success: false, error: 'Server error' });
     }
};