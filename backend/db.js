const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chatApp");
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
  // timestamp: ISODate("2022-01-01T12:00:00Z")
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