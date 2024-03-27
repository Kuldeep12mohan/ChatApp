const express = require("express");
const router = express.Router();
const { User} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


//signup route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const success = await User.findOne({
    username: username,
  });
  if (!success) {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.json({
      message: "User created successfully",
      token: token,
      user,
    });
  } else
    res.status(401).json({
      key: "user exist",
    });
});

//login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
      user,
    });
  } else
  res.status(401).json({
    key: "user doesn't exist",
  });
});

//route to get all the users except logged one and fetch the data of logged one
router.get("/", authMiddleware, async (req, res) => {
  const username = req.query.username || ""; // If username is not provided, set it to empty string
  const userList = await User.find({
    $and: [{ _id: { $ne: req.userId } }, { username: { $regex: username } }],
  });
  const sender = await User.findOne({
    _id:req.userId
  })
  res.json({
    userList,
    sender,
  }); 
});


module.exports = router;
