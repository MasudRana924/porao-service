const Notification = require("../schema/notificationSchema");
const createNotification=async(data)=>{
    const newNotification = new Notification(data);
    const createdNotification = await newNotification.save();
    return createdNotification;
};
module.exports={
    createNotification 
}