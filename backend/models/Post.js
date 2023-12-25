const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    description: {
        type: String,
    },
    picturePath: {
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