import { logout } from "@/State/Auth/Action";
import {  LogOut, Settings } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user, onClose, onLogout }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();


  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">
              {user.firstName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 mb-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Member since:</span>
              <span className="text-white">{user.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Books read:</span>
              <span className="text-white">{user.booksRead}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reading list:</span>
              <span className="text-white">{user.readingListCount} books</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 rounded transition-colors w-full text-left"
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4"/>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserDetails
