import React, { useState } from 'react';
import logo from 'assets/logo.png';
import search_icon from 'assets/search_icon.svg';
import bell_icon from 'assets/bell_icon.svg';
import profile_img from 'assets/profile_img.png';
import caret_icon from 'assets/caret_icon.svg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../firebase';
import SearchBar from '../Searchbar/Searchbar';

const Navbar = () => {
  const leftNavItems = [
    "Home",
    "TV Shows",
    "Movies",
    "New Releases",
    "My List",
    
  ];
  const navigate=useNavigate();
  const [activeItem, setActiveItem] = useState('Home');
  const handleClick = (e) => {
    setActiveItem(e.target.getAttribute('data'));
    const item = e.target.getAttribute('data');
    if (item === 'Home') {
      navigate('/');
    } else if (item === 'TV Shows') {
      navigate('/tv-shows');
    } else if (item === 'Movies') {
      navigate('/movies');
    } else if (item === 'New Releases') {
      navigate('/new');
    } else if (item === 'My List') {
      navigate('/watch');
    } else if (item === 'Languages') {
      navigate('/languages');
    }
  };
  const handlelogout=()=>{
    console.log("logeed");
    logout();
    

  }

  return (
    <div className="navbar w-full bg-black text-white shadow-md">
   <div className="max-w-[1280px] mx-auto px-10 py-4 flex items-center justify-between">


        
        {/* LEFT: Logo + Navigation */}
      <div className="nav-left flex items-center">


        
           <img src='/favicon.png' alt="Logo" className="h-10 object-contain" />
        
          <ul onClick={(e)=>{handleClick(e)}} className=" flex nav-left items-center text-sm font-medium list-none ml-4">
            {leftNavItems.map((item, index) => (
              <li
                data={item}
                key={index}
                className="cursor-pointer relative cursor-pointer px-2 py-1 hover:text-gray-300 transition"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] w-0 bg-red-500 rounded-full transition-all duration-300 hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Search, Children, Bell, Profile */}
      <div className="nav-right flex items-center gap-6">


         <SearchBar></SearchBar>
          <img
            src={bell_icon}
            alt="Notifications"
            className="h-5 w-5 cursor-pointer hover:scale-105 transition"
          />

          {/* Profile with Dropdown */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src={profile_img}
                alt="Profile"
                className="h-8 w-8 rounded-md object-cover"
              />
              <img
                src={caret_icon}
                alt="Caret"
                className="h-3 w-3 mt-[2px]"
              />
            </div>

            {/* Dropdown - shown on hover */}
            <div className="absolute top-full right-0 mt-2  bg-[#1a1a1a] text-white shadow-md rounded-md py-2 text-sm hidden group-hover:block z-50">
              <p onClick={handlelogout} className="px-4 py-2 hover:bg-gray-700 transition">LogOut</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;