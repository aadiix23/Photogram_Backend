const { getClient } = require("../config/telegram");
const File = require("../models/File")
const { Api } = require("telegram");
const fs = require("fs");
const { error } = require("console");
const { message } = require("telegram/client");

exports.uploadFile = async (req, res) => {
    const client = getClient();
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const result = await client.sendFile(
        "me",
        {
            file: file.path,
            caption: file.originalname,
        }
    );
    const savedFile = await File.create({
        userPhone: req.user.phone,
        telegramMessageId: result.id,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
    });
    fs.unlinkSync(req.file.path);
    res.json({
        success: true,
        telegramMessageId: result.id,
        fileName: file.originalname,
    });
};
exports.getFiles=async (req,res)=>{
    try {
        const userPhone=req.user.phone;
        const files=await File.find({userPhone}).sort({createdAt:-1});
        const response=files.map(file=>({
            id:file._id,
            fileName:file.fileName,
            mimeType:file.mimeType,
            uploadedAt:file.createdAt,
            viewUrl:`/files/view/${file._id}`
        }));
        res.json({
            success:true,
            files:response
        })
    } catch (error) {
        console.error(err);
        res.status(500).json({error:err.message});
        
    }
};
exports.viewFile=async(req,res)=>{
    try {
        const client=getClient();
        const fileId=req.params.id;
        const file=await File.findById(fileId);
        if(!file){
            return res.status(404).json({error:"File Not Found"})
        }
        const messages=await client.getMessages("me",{
            ids:file.telegramMessageId,
        });
        const message=messages[0];
        if(!message||!message.media){
            return res.status(404).json({error:"Media Not Found In Database"})
        }
        const buffer=await client.downloadMedia(message.media,{
            workers:1,
        });
        res.setHeader("Content-Type",file.mimeType);
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({error:err.message})
        
    }
};