import React, { useState } from 'react';
import { Home, Bell } from 'lucide-react';

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [animating, setAnimating] = useState('home');

  const handleClick = (id) => {
    setActiveItem(id);
    setAnimating(id);
    setTimeout(() => setAnimating(''), 2000);
  };

  const NavItem = ({ icon: Icon, label, id }) => (
    <button
      onClick={() => handleClick(id)}
      className={`relative flex flex-col items-center justify-center p-4 w-32 group 
        ${activeItem === id ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
    >
      <div className="relative">
        {id === 'you' ? (
          <div className={`relative ${animating === id ? 'animate-bounce-custom' : ''}`}>
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-600">
              <img
                src="/api/placeholder/100/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-1 bottom-0 w-3 h-3 bg-green-500 rounded-full transform translate-y-1/4" />
          </div>
        ) : (
          <div className={`
            ${animating === id && id === 'home' ? 'animate-bounce-custom' : ''}
            ${animating === id && id === 'notifications' ? 'animate-ring' : ''}
          `}>
            <Icon className="w-6 h-6" />
            {id === 'home' && (
              <div className="absolute -right-1 bottom-0 w-3 h-3 bg-blue-500 rounded-full transform translate-y-1/4" />
            )}
          </div>
        )}
      </div>
      <span className="mt-1 text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex items-center justify-center w-full bg-gray-900 text-white p-2 rounded-lg">
      <style>
        {`
          @keyframes bounceCustom {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-25%) scale(1.2); }
          }

          @keyframes ring {
            0%, 100% { transform: rotate(0) scale(1); }
            25% { transform: rotate(15deg) scale(1.2); }
            75% { transform: rotate(-15deg) scale(1.2); }
          }

          .animate-bounce-custom {
            animation: bounceCustom 2s ease-in-out;
          }

          .animate-ring {
            animation: ring 2s ease-in-out;
          }
        `}
      </style>
      <nav className="flex items-center space-x-4">
        <NavItem icon={Home} label="Home" id="home" />
        <NavItem icon={Bell} label="Notifications" id="notifications" />
        <NavItem label="You" id="you" />
      </nav>
    </div>
  );
};

export default NavigationBar;