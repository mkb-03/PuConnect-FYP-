const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
    },
    userPicturePath: {
        type: String,
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
},
{ timestamps: true }
);

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;