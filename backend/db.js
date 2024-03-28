const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mohankuldeep1234:LubQRLiWKJLyz0WW@cluster0.ztkcsaw.mongodb.net/chatApp");
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
const User = mongoose.model('User',userSchema);
const Message = mongoose.model('Message',messageSchema);
module.exports = {
  User,Message
};