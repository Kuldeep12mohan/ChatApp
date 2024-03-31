const express = require("express");
const router = express.Router();
const { User} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     return cb(null, '../frontend/src/components')
  },
  filename: function (req, file, cb) {
    return cb(null,`${Date.now()}-${file.originalname}`);
  },
})

const upload = multer({ storage: storage })
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
router.post('/profile', upload.single('profilePicture'), async function (req, res) {
  try {
    console.log(req.file);
    // Ensure that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Update the user's profile picture path in the database
    const profile = await User.updateOne({
      _id: req.userId,
      $set: {
        avatar: req.file.filename, // Corrected file path format
      }
    });

    console.log(profile);
    // Send a JSON response indicating success
    res.redirect("http://localhost:5173/profile");
  } catch (error) {
    console.error(error);
    // Send a JSON response indicating an error occurred
    res.status(500).json({ error: "An error occurred while updating the profile picture" });
  }
});


router.get("/profile",authMiddleware,async(req,res)=>
{
  const user = await User.findOne({
    _id:req.userId
  })
  const imgSrc = user.avatar;
  const profileName = user.username;
  console.log(imgSrc);
  res.json({
    imgSrc,
    profileName
  })
})

module.exports = router;
