require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const {initTelegram}=require("../src/config/telegram");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/auth",require("./routes/auth.routes"));
app.use("/files",require("./routes/file.routes"));
app.use("/user",require("./routes/user.routes"));
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB Connected"));
initTelegram().then(()=>{
    app.listen(process.env.PORT,()=>
    console.log("server Running On PORT",process.env.PORT)
);
});