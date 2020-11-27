const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [];

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

app.listen(3333);
