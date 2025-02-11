// import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
            <Link to="/transactions" className="hover:text-primary">Transactions</Link>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  );
}
