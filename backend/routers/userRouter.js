const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("hello it is working");
});

module.exports = router;
