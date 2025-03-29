import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import UserTable from '../components/UserTable';
// import { useDispatch,useSelector } from 'react-redux';


const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-2xl p-4 rounded-r-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="flex-1 p-6 relative overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            className="md:hidden bg-white p-2 rounded-full shadow hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-[#1E90FF]">Home</h1>
        </div>
        <div >
      <UserTable/>
        </div>
      </main>
    </div>
  );
};

export default HomePage;