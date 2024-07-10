const User = require("../model/User");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Invalid input" });
  const isNotAlreadyCreated = await User.findOne({ username: user }).exec();
  if (isNotAlreadyCreated) return res.sendStatus(409);

  try {
    const bcryptPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: user,
      password: bcryptPassword,
    });
    console.log(newUser);
    res.status(201).json({ message: `User ${user} created successfully` });
  } catch (error) {
    console.error(error);
  }
};

module.exports = userRegister;
