const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
module.exports = router;
