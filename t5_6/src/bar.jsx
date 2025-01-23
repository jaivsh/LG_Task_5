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
      className={`relative flex flex-col items-center justify-center p-4 w-20 h-20 group transition-all duration-300 ease-in-out
        ${activeItem === id ? 'text-white font-bold scale-110' : 'text-gray-400 hover:text-gray-300 hover:scale-105 hover:bg-gray-800'}
        rounded-xl`}
    >
      <div className="relative">
        {id === 'you' ? (
          <div className={`relative ${animating === id ? 'animate-bounce-custom' : ''}`}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute -right-1 bottom-0 w-4 h-4 bg-green-500 rounded-full transform translate-y-1/4 animate-pulse" />
          </div>
        ) : (
          <div className={`
            ${animating === id && id === 'home' ? 'animate-bounce-custom' : ''}
            ${animating === id && id === 'notifications' ? 'animate-ring' : ''}
          `}>
            <Icon className="w-8 h-8" />
            {id === 'home' && (
              <div className="absolute -right-1 bottom-0 w-4 h-4 bg-blue-500 rounded-full transform translate-y-1/4" />
            )}
          </div>
        )}
      </div>
      <span className="mt-2 text-sm md:text-lg font-medium">{label}</span>
      {activeItem === id && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-500 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 px-6 rounded-t-lg shadow-xl">
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
      <nav className="flex items-center justify-around space-x-4 ">
        <NavItem icon={Home} label="Home" id="home" />
        <NavItem icon={Bell} label="Notifications" id="notifications" />
        <NavItem label="You" id="you" />
      </nav>
    </div>
  );
};

export default NavigationBar;
