import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageSrc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/post", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      console.log("Post created successfully:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error, display error message to the user
    }
  };

  return (
    <div className="container mx-auto bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500" rows="4" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="imageSrc" className="block text-sm font-semibold mb-2">Image Source:</label>
          <input type="text" id="imageSrc" name="imageSrc" value={formData.imageSrc} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
