import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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

        // Check if both requests were successful
        if (allPostsResponse.status === 200 && userPostsResponse.status === 200) {
          const mergedPosts = [...allPostsResponse.data, ...userPostsResponse.data];
          setAllPosts(mergedPosts);
          setError(null); // Reset error if data is fetched successfully
        } else {
          setError("Failed to fetch posts");
        }
      } catch (error) {
        setError("Error fetching posts");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      {error && <div>Error: {error}</div>}
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
