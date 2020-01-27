const bcrypt = require("bcryptjs");
const User = require("../../models/User");

module.exports = async (req, res) => {
  const { username, password, email, name } = req.body;

  try {
    let user = await User.findOne({ username });
    if(!user) user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: "Username or password already exists" });
  } catch (error) {
    return res.status(500).json({ message: "Server error during authentication" });
  }

  try {
    const hashPass = bcrypt.hashSync(password, 10);

    const user = new User({
      username,
      password: hashPass,
      email,
      name,
    });
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: `Server error registering new user '${username}'` });
  }
};
