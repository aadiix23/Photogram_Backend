require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const {initTelegram}=require("../src/config/telegram");
const path = require("path");
const app=express();
app.use(cors());
app.use(express.json());

// Serve static files with cache headers
app.use('/uploads', (req, res, next) => {
    // Set cache headers for images (1 year)
    if (req.url.includes('/uploads/optimized/') || req.url.includes('/uploads/thumb/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day for regular uploads
    }
    next();
}, express.static('uploads'));

app.use("/auth",require("./routes/auth.routes"));
app.use("/files",require("./routes/file.routes"));
app.use("/user",require("./routes/user.routes"));
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB Connected"));
initTelegram().then(()=>{
    app.listen(process.env.PORT,()=>
    console.log("server Running On PORT",process.env.PORT)
);
});