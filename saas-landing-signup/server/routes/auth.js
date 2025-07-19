const validator = require('validator'); // Install using `npm i validator`

router.post('/signup', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const token = crypto.randomBytes(32).toString('hex');

  try {
    const user = await User.create({ name, email, verificationToken: token });
    await sendEmail(email, token);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
