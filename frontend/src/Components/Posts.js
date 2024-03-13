import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all posts and user's posts
        const allPostsResponse = await axios.get("http://localhost:3000/post/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userPostsResponse = await axios.get("http://localhost:3000/post/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 

        console.log("All posts", allPostsResponse )
        console.log("User posts", userPostsResponse )
        // Combine all posts and user's posts into a single array
        const mergedPosts = [...allPostsResponse.data, ...userPostsResponse.data];

        // Sort the merged array by date or any other criteria if needed
        // mergedPosts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

        // Set the merged array to the state
        setAllPosts(mergedPosts);
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      {allPosts.map((post) => (
        <div key={post._id}>
          <div>{post.description}</div>
          {post.picturePath && (
            <img src={`http://localhost:3000/images/${post.picturePath}`} alt="Post" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
