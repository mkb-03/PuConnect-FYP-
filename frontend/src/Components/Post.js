import React from 'react';
import ProfilePicture from "./ProfilePicture";

const Post = ({ isPostPic }) => {
  return (
    <div className="card mt-4 me-5">
      <div className="card-body">
        <h5 className="card-title">New Post</h5>
        <div className="row">
          <div className="col-md-2"> {/* Adjust the column width as needed */}
            <ProfilePicture isPostPic={isPostPic} />
          </div>
          <div className="col-md-10"> {/* Adjust the column width as needed */}
            <input
              type="text"
              className="form-control"
              placeholder="What's in your mind?"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
