const {getClient}=require("../config/telegram");
const jwt = require("jsonwebtoken");
const { Api } = require("telegram");
let phoneCodeHashStore={};
exports.sendOtp=async(req,res)=>{
    const{phone}=req.body;
    const client=getClient();
    const result=await client.sendCode(
        {apiId:client.apiId,apiHash:client.apiHash},
        phone
    );
 phoneCodeHashStore[phone] = result.phoneCodeHash;

  res.json({
    success: true,
    phoneCodeHash: result.phoneCodeHash
  });
};


exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const client = getClient();

    await client.invoke(
      new Api.auth.SignIn({
        phoneNumber: phone,
        phoneCodeHash: phoneCodeHashStore[phone],
        phoneCode: otp,
      })
    );

    const token = jwt.sign({ phone }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
    });

  } catch (err) {
    console.error(err);

    if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
      return res.status(401).json({
        error: "2FA enabled on this Telegram account. Disable it for prototype."
      });
    }

    res.status(400).json({ error: err.message });
  }
};
