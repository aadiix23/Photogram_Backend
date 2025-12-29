const mongoose = require("mongoose");
const fileschema= new mongoose.Schema({
    userPhone:{
        type:String,
        required:true,
    },
    telegramMessageId:{
        type:Number,
        required:true,
    },
    fileName:{
        type:String,
        required:true,
    },
    mimeType:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
}
);
module.exports=mongoose.model("File",fileschema);