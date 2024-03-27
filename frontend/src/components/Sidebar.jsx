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
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
       <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{sender.username}</h1>
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
            <li onClick={()=>
            {
              navigate(`/?sender=${sender.username}&receiver=${item.username}`);
            }} key={index} className="py-2 hover:bg-gray-800 cursor-pointer">{item.username}</li>
          );
        })}
       
        {/* <li className="py-2 hover:bg-gray-800 cursor-pointer">Dhruv</li>
        <li className="py-2 hover:bg-gray-800 cursor-pointer">Paras</li>
        <li className="py-2 hover:bg-gray-800 cursor-pointer">Swati</li> */}
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
