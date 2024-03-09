const OTP = require("../schema/otpSchema");
const sendOTP=async(data)=>{
    const newOTP = new OTP(data);
    const createdOTP = await newOTP.save();
    return createdOTP;
};
module.exports={
    sendOTP 
}