const express = require("express");
const router = express.Router();
const { Message,User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

//route to post messages
router.post("/", async (req, res) => {
  const messageData = req.body; // messageData is an object which contains sender, receiver, and text
  
  // Find sender and receiver users
  const sender = await User.findOne({ username: messageData.sender });
  const receiver = await User.findOne({ username: messageData.receiver });

  if (sender && receiver) {
    // Create the message using sender and receiver IDs
    const newMessage = await Message.create({
      senderId: sender._id,
      recipientId: receiver._id,
      sender:sender.username,
      recipient:receiver.username,
      content: messageData.text,
    });

    // Send the newly created message as a response
    res.json({
      message: newMessage,
    });
  } else {
    // Send an error response if sender or receiver not found
    res.status(401).json({
      key: "some error",
    });
  }
});
//route to get the messages of logged one i.e either senderId matches or recipentId matches
  router.get("/",authMiddleware,async(req,res)=>
  {
    const messages = await Message.find({
      $or: [
        { senderId: req.userId },
        { recipientId: req.userId }
      ]
    });
    if(messages)
    {
      res.json({
        messages,
      })
    }
    else res.status(401)({
      key:"some error"
    })
  })
module.exports = router;