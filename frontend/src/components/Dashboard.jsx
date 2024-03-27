import React from 'react'
import Sidebar from './Sidebar'
import ChatComponent from './ChatComponent'
import { useLocation } from 'react-router-dom'
const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get("sender");
  const receiver = queryParams.get("receiver");
  return(
  <div className='flex'>
  <Sidebar/>
  <ChatComponent sender={sender} receiver={receiver}/>
  </div>
  );
 
}

export default Dashboard