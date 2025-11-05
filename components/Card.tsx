
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg ${className}`}>
        {title && (
             <div className="flex items-center p-4 border-b border-gray-700">
                {icon}
                <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
            </div>
        )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
