const userModel = require('./userModel');

exports.createUser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    console.log(user);
    const savedUser = await user.save();
    res.json({
      status: 'success',
      data: savedUser,
      message: 'user added successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.createUserLogin = async (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json('success');
      } else {
        res.json('the password is incorrect');
      }
    } else {
      res.json('no record found');
    }
  });
};
exports.findAllUser = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (!user) {
      return res.status(404).json({ error: 'blog not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
