const router = require("express").Router();
const auth =require("../middleware/auth.middleware");
const {getUserProfile}=require("../controllers/user.controller");
router.get("/profile",auth,getUserProfile);
module.exports=router;