
import React from 'react';
import { NetworkIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NetworkIcon className="h-8 w-8 text-cyan-400" />
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white tracking-wider">Supply Chain Command Center</h1>
              <p className="text-xs text-gray-400">Powered by Gemini for Real-Time Insights</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
