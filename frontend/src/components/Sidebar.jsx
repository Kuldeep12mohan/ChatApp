import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useDebounce from "./useDebounce"
const Sidebar = () => {
  const navigate = useNavigate();
  const [userList,setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sender,setSender] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const log = await axios.get(`http://localhost:3000/api/v1/user?username=${debouncedSearchTerm}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = log.data.userList;
        setUserList(data);
        setSender(log.data.sender);
      } catch (error) {
        console.error("Error:", error);
      }

    };
    fetchUser();
  }, [debouncedSearchTerm]);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    navigate(`/?sender=${sender.username}&receiver=${item.username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
       <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{sender.username}</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 text-white rounded p-2 focus:outline-none"
          onChange={e=>setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {userList.map((item,index)=>
        {
          return(
            <li  onClick={() => handleItemClick(item)} key={index}
            className={`py-2 hover:bg-gray-800 cursor-pointer ${selectedItem === item ? 'bg-gray-600' : ''}`}>{item.username}</li>
          );
        })}
      
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
