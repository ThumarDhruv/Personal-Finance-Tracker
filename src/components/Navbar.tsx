// import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import { clearUserSession, getUserSession } from '../utils/auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(getUserSession());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserSession());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img 
            src="https://plus.unsplash.com/premium_photo-1675876765108-ec39630a511e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ5fHxmaW5hbmNlJTIwbG9nbyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Logo" 
            className="h-8 w-8 object-cover" 
          />
          <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-primary">Dashboard</Link>
            <Link 
              to="/transactions" 
              state={{ from: location.pathname }}
              className="hover:text-primary"
            >
              Transactions
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600 dark:text-gray-300">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Start Registration
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Already have an account?
              </Link>
            </>
          )}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 
              <Sun className="h-5 w-5" /> : 
              <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
