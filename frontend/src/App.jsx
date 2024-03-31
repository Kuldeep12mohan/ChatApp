import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import ChatComponent from "./components/ChatComponent";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import CreatePostPage from "./components/CreatePost";
import EditProfilePage from "./components/EditProfilePage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
