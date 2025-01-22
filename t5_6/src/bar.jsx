import React, { useState } from 'react';
import { Home, Bell, User } from 'lucide-react';

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
      className={`relative flex flex-col items-center justify-center p-8 w-48 h-32 group transition-all duration-300 ease-in-out
        ${activeItem === id ? 'text-white font-bold scale-110' : 'text-gray-400 hover:text-gray-300 hover:scale-105 hover:bg-gray-800'}
        rounded-xl`}
    >
      <div className="relative">
        {id === 'you' ? (
          <div className={`relative ${animating === id ? 'animate-bounce-custom' : ''}`}>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute -right-1 bottom-0 w-5 h-5 bg-green-500 rounded-full transform translate-y-1/4 animate-pulse" />
          </div>
        ) : (
          <div className={`
            ${animating === id && id === 'home' ? 'animate-bounce-custom' : ''}
            ${animating === id && id === 'notifications' ? 'animate-ring' : ''}
          `}>
            <Icon className="w-12 h-12" />
            {id === 'home' && (
              <div className="absolute -right-1 bottom-0 w-5 h-5 bg-blue-500 rounded-full transform translate-y-1/4" />
            )}
          </div>
        )}
      </div>
      <span className="mt-4 text-lg font-medium">{label}</span>
      {activeItem === id && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="flex items-center justify-center w-full bg-gray-900 text-white py-6 px-8 rounded-lg shadow-xl">
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
      <nav className="flex items-center space-x-8">
        <NavItem icon={Home} label="Home" id="home" />
        <NavItem icon={Bell} label="Notifications" id="notifications" />
        <NavItem label="You" id="you" />
      </nav>
    </div>
  );
};

export default NavigationBar;