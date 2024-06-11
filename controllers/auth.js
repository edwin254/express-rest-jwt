const User = require('./models/user');

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = User.find(u => u.email === email);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid email or Paaword');
    }
  
    // Generate JWT 
    const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '1h' });
  
    res.status(200).send({ token });
  });