const router=require("express").Router();
const multer=require("multer");
const auth =require("../middleware/auth.middleware")
const {uploadFile,getFiles,viewFile}=require("../controllers/file.controller");
const upload=multer({dest:"uploads/"});
router.post("/upload",auth,upload.single("file"),uploadFile);
router.get("/",auth,getFiles);
router.get("/view/:id",auth,viewFile);
module.exports=router;