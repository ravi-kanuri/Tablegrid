import React from "react";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/home"); 
  };

  return (
    <div className="w-68 h-lvh transition-all duration-300 bg-white border-r flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-5">
        <button>
          <div
            className="flex items-center space-x-2 p-2 rounded-md cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <img className="w-11 h-11" src="/logo.jpeg" alt="Logo" />
            <span className="text-3xl pl-1 font-bold text-black">Table Grid</span>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto"></div>

      {/* Log Out */}
      <div className="p-4 border-t border-black space-y-2">
        <button
          className="w-full flex items-center justify-between p-2 hover:bg-blue-400 rounded-md cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={handleLogout}
        >
          <div className="flex items-center space-x-2 ml-4">
            <LogOut className="w-7 h-7" />
            <span className="text-md font-semibold">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
