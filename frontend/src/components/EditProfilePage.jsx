import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Profile Picture</h2>
        <form action='http://localhost:3000/api/v1/user/profile' method='post' encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-400 mb-1">New Profile Picture</label>
            <input 
              type="file" 
              id="profilePicture" 
              name="profilePicture" 
              className="w-full bg-gray-700 rounded border border-gray-600 px-3 py-2 text-gray-300 focus:outline-none focus:border-blue-500" 
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
