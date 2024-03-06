import React from "react";
import ProfilePicture from "./ProfilePicture";

const Post = ({isPostPic}) => {
  return (
    <div>
      <div class="card mt-4 me-5">
        <div class="card-body">
        <h5 class="card-title">New Post</h5>
          <p class="card-text">
          <span>
              <ProfilePicture
                isPostPic={isPostPic}
              />
              <input type="text" placeholder="What's in your mind?" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
