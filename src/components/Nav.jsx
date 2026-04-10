import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export const Nav = ({ authData, setAuthData }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "inkwell"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("inkwell-light");
    } else {
      setTheme("inkwell");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setAuthData(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-transparent border-b-2 z-50 border-neutral shadow-sm px-4 md:px-12 lg:px-56 sticky backdrop-blur-lg top-0">
      <div className="flex-1">
        <Link to="/" className="flex text-xl items-center gap-1 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pen-line-icon lucide-pen-line text-primary"
          >
            <path d="M13 21h8" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          Inkwell
        </Link>
      </div>
      <div className="flex-none flex items-center gap-4">
        <label className="swap swap-rotate hover:bg-base-200 p-2 rounded-xl transition-colors">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === "inkwell-light"}
            onChange={toggleTheme}
          />
          <svg className="swap-on size-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          <svg className="swap-off size-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>

        {authData ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-3 hover:bg-base-200 p-2 rounded-2xl transition-all">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-lg font-bold">{(authData.name || "U").charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <span className="font-bold text-base-content hidden sm:block">{authData.name}</span>
            </div>
            
            <div tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-100 border border-neutral/20 rounded-2xl w-64 mt-4">
              <div className="px-4 py-3 border-b border-neutral/10 mb-2">
                <p className="font-black text-lg text-base-content">{authData.name}</p>
                <p className="text-sm text-base-content/50 break-all">{authData.email}</p>
                <div className="badge badge-primary badge-outline mt-2 text-[10px] font-bold uppercase tracking-wider">
                  {authData.role}
                </div>
              </div>
              
              <li>
                <Link to="/profile" className="flex items-center gap-3 py-3 font-bold text-base-content/70 hover:text-primary">
                  <User size={18} /> Profile Details
                </Link>
              </li>

              {authData.role === 'author' && (
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 py-3 font-bold text-base-content/70 hover:text-primary">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                </li>
              )}

              <div className="divider my-0 opacity-5"></div>
              
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 py-3 font-bold text-error hover:bg-error/10"
                >
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-base-content text-md font-bold hover:text-primary transition-colors cursor-pointer">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-primary text-primary-content text-md font-bold py-2.5 px-6 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
