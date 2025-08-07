import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Simple Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown Theme Selector (opsiyonel) */}
      <div className="relative group">
        <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <Monitor className="w-5 h-5" />
        </button>
        
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <button
              onClick={setLightTheme}
              className={`w-full flex items-center px-3 py-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Sun className="w-4 h-4 mr-3" />
              Light Mode
            </button>
            <button
              onClick={setDarkTheme}
              className={`w-full flex items-center px-3 py-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Moon className="w-4 h-4 mr-3" />
              Dark Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;