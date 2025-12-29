const {getClient}=require("../config/telegram")
exports.getUserProfile=async(req,res)=>{
    try {
        const client=getClient();
        const me =await client.getMe();
        res.json({
            user:{
            id:me.id,
            phone:me.phone||req.user.phone,
            firstName:me.firstName||"",
            lastName:me.lastName||"",
            username:me.username||null,
            isPremium:me.premium||false,
            profilePhoto:me.photo?`/user/profile/photo`:null
            }
        });
    } catch (error) {
        console.error(err);
        res.status(500).json({error:err.msg}); 
    }
};