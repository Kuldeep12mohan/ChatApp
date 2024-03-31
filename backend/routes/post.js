const express = require("express");
const router = express.Router();
const { User,Post} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

router.post("/",authMiddleware,async(req,res)=>
{
  const { imageSrc, title, description} = req.body;
  const user = await User.findOne({
    _id:req.userId
  })
  const post = await Post.create({
    userId:req.userId,
    username:user.username,
    post:{
      imageSrc:imageSrc,
      title:title,
      description:description
    }
  })
  res.json({
    key:"posted successfully"
  })
})
//route for all of the posts of logged one
router.get("/",authMiddleware,async(req,res)=>
{
  const postList = await Post.find({
    userId:req.userId
  });
  if(postList)
  {
    res.json({
      postList
    })
  }
  else res.json({
    key:"nthing here"
  })
})

//route for all the post of database except logged one
router.get("/all",authMiddleware,async(req,res)=>
{
  const postList = await Post.find({
    userId:{$ne:req.userId}
  });
  if(postList)
  {
    res.json({
      postList
    })
  }
  else res.json({
    key:"nthing here"
  })
})
module.exports = router;