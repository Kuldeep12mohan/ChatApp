const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.DATABASE_URI);
const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  avatar:String
});
const messageSchema = new mongoose.Schema({
  senderId: String,
  recipientId:String,
  sender:String,
  recipient:String,
  content: String,
})
const postSchema = new mongoose.Schema({
  userId:String,
  username:String,
  post:{
    imageSrc:String,
    title:String,
    description:String,
    likes:Number,
    Comment:[
      {
        commentor:String,
        text:String,
      }
    ]
  }
})
const User = mongoose.model('User',userSchema);
const Message = mongoose.model('Message',messageSchema);
const Post = mongoose.model('Post',postSchema)
module.exports = {
  User,Message,Post
};