import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const token = useSelector((state) => state.auth.token);
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllPosts(response.data);
        console.log(response.data)
      } catch (error) {
        console.log("Error fetching all posts", error);
      }
    };

    const fetchUserPosts = async ()=>{
        try {
            const response = await axios.get("http://localhost:3000/post/getAll", {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            setUserPosts(response.data)
            console.log("User Posts: " , response.data);
            
        } catch (error) {
            console.log("Error fetching user posts", error);
        }
    }

    fetchAllPosts();
  }, [token]);


  return <div>
    {allPosts.map((post)=>(
        <div key={post._id}>
            <div>{post.description}</div>
        </div>
    ))}
  </div>;
};

export default Posts;
