import React from 'react';
import Sidebar from './Sidebar';
import ChatComponent from './ChatComponent';
import { useLocation } from 'react-router-dom';
import Login from './Login';

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get("sender");
  const receiver = queryParams.get("receiver");

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className='flex'>
          <Sidebar />
          {receiver?<ChatComponent sender={sender} receiver={receiver} />:""}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dashboard;
