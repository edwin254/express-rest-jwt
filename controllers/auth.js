const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login route
exports.Login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne(
        { where: { email: email },}
    )
    const password_valid = await bcrypt.compare(password,user.password);
  
    if (!user || !password_valid) {
        return res.status(401).send('Invalid email or Password');
    }
  
    // Generate JWT 
    const token = jwt.sign({ userId: user.email }, process.env.secretKey, { expiresIn: '1h' });
  
    return res.status(200).send({ token });


  };