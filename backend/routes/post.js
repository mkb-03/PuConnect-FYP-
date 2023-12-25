const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require('../models/Post');

router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the post object
    let {userId, description, picturePath} = req.body;
    userId = user._id


    if(!description){
        return res.status(402).json({err: "Invalid details"})
    }

    const postObj = {userId, description, picturePath};

    const post = await Post.create(postObj);

    // 3. Return a response
    return res.status(200).json(post);

});


module.exports = router;