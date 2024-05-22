const PostModel = require("../models/Post");
const NotificationModel = require("../models/Notification");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        const { teacherId } = req.user;
        const newPost = await PostModel.createNewPost({
            teacherId,
            description
        });
        const notificationData = {
            message: `New post created by teacher`,
        };
        const newNotification = await NotificationModel.createNotification(notificationData);
        // Emit the notification to all connected clients
        const io = req.app.get('socketio');
        //notification er jonno io emit je name e kora hoise frontend e sei name ei catch kora lagbe 
        io.emit('new-notification', newNotification);
        res.created(newPost, "Post create successfully");
    } catch (err) {
        errorResponseHandler(err, req, res);
    }
};
const getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.getAllPost();
        res.success(posts, "Post  fetched successfully");
    } catch (err) {
        errorResponseHandler(err, req, res);
    }
};
module.exports = {
    createPost,
    getAllPost
}