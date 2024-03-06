import React from "react";
import ProfilePicture from "./ProfilePicture";

const Post = ({isPostPic}) => {
  return (
    <>
      <div className="card mt-4 me-5">
        <div className="card-body">
        <h5 className="card-title">New Post</h5>
          <p className="card-text">
          <span>
              <ProfilePicture
                isPostPic={isPostPic}
              />
              <input type="text" placeholder="What's in your mind?" />
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
