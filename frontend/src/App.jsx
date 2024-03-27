import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import ChatComponent from "./components/ChatComponent";
import Dashboard from "./components/Dashboard";
const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/chat"
          element={<ChatComponent />}
        />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
