const PostModel = require("../models/Post");
const { errorResponseHandler } = require("../helper/errorResponseHandler");
const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        const { teacherId } = req.user;
        const newPost = await PostModel.createNewPost({
            teacherId,
            description
        });
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