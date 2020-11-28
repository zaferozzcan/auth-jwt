const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    // check if all areas are filled
    let { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be at least 5 characters long.",
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    // check existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    // check a name entered
    if (!displayName) displayName = email; // display email if a name is not given by user

    //   -------------- hashing passport -----------------//
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    User.create({ email, password: passwordHash, displayName }, (err, data) => {
      if (!err) {
        res.status(200).json(data);
      } else {
        res.status(400).json(err.message);
      }
    });

    // catch error
  } catch (err) {
    if (err) {
      res.status(500).json(err.message);
    }
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
