import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/AuthSlice";
import { Menu, X, LogOut, LogIn, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { post } from '../services/ApiEndpoint';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
  const isAuthenticated = Boolean(user);

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Navigation items based on user role
  const getNavItems = () => {
    if (!user) return [{ name: "Home", path: "/" }];

    switch (user.role) {
      case "admin":
        return [
          { name: "Home", path: "/" },
          { name: "Admin Dashboard", path: "/admin" },
        ];
      case "donor":
        return [
          { name: "Home", path: "/" },
          { name: "Dashboard", path: "/donor" },
          // { name: "My Donations", path: "/donor/donations" }
        ];
      case "ngo":
        return [
          { name: "Home", path: "/" },
          { name: "Dashboard", path: "/ngo" },
          // { name: "Requests", path: "/ngo/requests" },
          { name: "Logistics", path: "/ngo/logistics" }
        ];
      case "volunteer":
        return [
          { name: "Home", path: "/" },
          { name: "Dashboard", path: "/volunteer" },
          { name: "My Deliveries", path: "/volunteer/deliveries" }
        ];
      default:
        return [{ name: "Home", path: "/" }];
    }
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-b border-gray-500/30 sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
              TS
            </div>
            Tech Savvy
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-200" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {getNavItems().map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white transition-colors duration-300 ${isActive ? "text-white font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* User Authentication */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-gray-300 hover:text-white transition-colors">
                      {user?.name || "User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* User Menu Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl border border-gray-700/50"
                      >
                        <div className="p-2">
                          <div className="px-3 py-2 text-sm text-gray-400">
                            Role: {user.role}
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
