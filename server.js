const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const users = [];
const posts = [
  {
    username: "Zafer",
    title: "Post 1",
  },
  {
    username: "John",
    title: "Post 2",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.sendStatus(201).send();
});

app.post("/users/login", (req, res) => {
  //   authenticate user
  const loggingUser = users.find((user) => (user = req.body.name));
  console.log("logging user", loggingUser);
  if (loggingUser == null) {
    res.status(400).send("Cannot find the user");
  }
  try {
    if (bcrypt.compareSync(req.body.password, loggingUser.password)) {
      res.json("Success");
      console.log("user logged in");
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      const accessToken = jwt.sign({ user: loggingUser.name }, "hello");
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Password did not match!");
    }
  } catch {
    res.status(500).send();
  }

  // create token

  res.send(accessToken);
});

// posts route
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(3333);
