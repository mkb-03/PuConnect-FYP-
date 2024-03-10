import React from "react";
import ProfilePicture from "./ProfilePicture";

const Post = ({ isPostPic }) => {
  return (
    <div className="card mt-4 ">
      <div className="card-body text-center">
        <div className="row">
          <div className="col-sm-2">
            <ProfilePicture isPostPic={isPostPic} />
          </div>
          <div className="col-sm-10 ">
            <input
              type="text"
              className="form-control mt-1 "
              placeholder="What's in your mind?"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
