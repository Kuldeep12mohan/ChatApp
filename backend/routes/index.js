const express = require('express');
const userRouter = require("./user");
const messageRouter = require("./message");
const router = express.Router();

router.use("/user", userRouter);
router.use("/message",messageRouter);

module.exports = router;