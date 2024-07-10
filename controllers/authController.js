const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: "Invalid input" });
  const findUser = await User.findOne({ username: user }).exec();
  if (!findUser) return res.sendStatus(401);
  const comparePassword = bcrypt.compare(password, findUser.password);
  if (comparePassword) {
    const roles = Object.values(findUser.roles);
    // Create JWT token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: findUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120s" }
    );
    const refreshToken = jwt.sign(
      { username: findUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    findUser.refreshToken = refreshToken;
    const result = await findUser.save();
    console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
