const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
    getPublicChat,
    postPublicMsg,
    getChatByEmail,
    getPriveteChatByUser,
    postPrivateMessage
} = require("../controllers/chatController");

const router = express.Router();

router.get("/", middlewares.isRegister, getPublicChat); 
router.post("/", middlewares.isRegister, postPublicMsg);  
router.get("/private", middlewares.isRegister, getPriveteChatByUser)  
router.get("/:email", middlewares.isAdmin,getChatByEmail);  
router.post("/private", middlewares.isRegister, postPrivateMessage);  


module.exports = router;
