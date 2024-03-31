const express = require('express');
const userRouter = require("./user");
const messageRouter = require("./message");
const postRouter = require("./post");
const router = express.Router();

router.use("/user", userRouter);
router.use("/message",messageRouter);
router.use("/post",postRouter);

module.exports = router;