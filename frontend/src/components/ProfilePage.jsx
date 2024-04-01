import React, { useEffect, useState } from 'react';
import PostCard from "./PostCard";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ProfilePage = () => {
  const [profileImage,setProfileImage] = useState('');
  const [profileName,setProfileName] = useState('');
  const [followers,setFollowers] = useState(0);
  const [following,setFollowing] = useState(0);
  const [postList,setPostList] = useState([]);
  const [user,setUser] = useState('');
  const [newPost, setNewPost] = useState();
  const navigate = useNavigate();
  useEffect(()=>
  {
    const fetchImage=async()=>
    {
      const response = await axios.get("http://localhost:3000/api/v1/user/profile",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      const img = response.data.imgSrc;
      const name = response.data.profileName;
      setProfileName(name);
      setProfileImage(img);
    }
    fetchImage();
  },[])
  useEffect(()=>
  {
    const fetchPost=async()=>
    {
      const response = await axios.get("http://localhost:3000/api/v1/post",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      const data = response.data.postList;
      setPostList(data);
    }
    fetchPost();
  },[])
  return (
    <div className="w-screen-md bg-gray-900 text-white">
      {/* Post button container */}
      <div className="absolute top-0 left-0 mt-4 ml-4 z-10">
        <button onClick={() => navigate("/create")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Post
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-4 relative">
          {profileName}
          <img src={profileImage} alt="Profile" className="rounded-full w-32 h-32" />
          <button onClick={() => navigate("/edit-profile")} className="absolute bottom-0 right-0 bg-gray-800 text-white text-sm px-2 py-1 rounded">
            Edit Profile
          </button>
        </div>
        <h1 className="text-2xl font-bold">{user}</h1>
        <div className="flex mt-2">
          <p className="mr-4">Followers: {followers}</p>
          <p>Following: {following}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-16">
        {postList.map((item, index) => (
          <PostCard key={index} post={{ title: item.post.title, content: item.post.description, likes: 0, comments: [], image:item.post.imageSrc }} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
