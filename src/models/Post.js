const PostSchema = require("../schema/postSchema");
const createNewPost = async (data) => {
    const newPost = new PostSchema(data);
    const createdNewPost = await newPost.save();
    return createdNewPost;
};
const getAllPost = async () => {
    const post = await PostSchema.aggregate([
        {
            $lookup: {
                from: "teacheraccounts",
                localField: "teacherId",
                foreignField: "teacherId",
                as: "teacherInfo",
            },
        },
        {
            $unwind: "$teacherInfo",
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $project: {
                _id: 0,
                teacherId: 0,
            },
        },
    ]);
    return post;
};
module.exports = {
    createNewPost,
    getAllPost,
}