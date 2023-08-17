const userModel = require('./userModel');

exports.createUser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    console.log(user);
    const savedUser = await user.save();
    res.json({ code: 200, message: 'Signup success', user: savedUser });
  } catch (error) {
    res.json({ code: 500, message: 'Signup Err', error: error.message });
  }
};
exports.createUserLogin = async (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then(result => {
      console.log(result, '11');

      if (result.password !== password) {
        res.send({ code: 404, message: 'password wrong' });
      } else {
        res.send({
          email: result.email,
          code: 200,
          message: 'user Found',
          token: 'hfgdhg',
        });
      }
    })
    .catch(err => {
      res.send({ code: 500, message: 'user not found', error: err });
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
