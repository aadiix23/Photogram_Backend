const {TelegramClient} = require('telegram');
const {StringSession}=require("telegram/sessions");
const apiId=Number(process.env.TG_API_ID);
const apiHash=process.env.TG_API_HASH;
let client;
const initTelegram=async()=>{
    client=new TelegramClient(
        new StringSession(""),
        apiId,
        apiHash,
        {connectionRetries:5}
    );
    await client.connect();
};
const getClient=()=>client;
module.exports={initTelegram,getClient};