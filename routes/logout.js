const express = require("express");

const app = express();
const { Router } = express;
const router = new Router();
 
router.get("/", (req, res) => {
  req.logout();
  res.redirect('/')
});
 
module.exports = router;
