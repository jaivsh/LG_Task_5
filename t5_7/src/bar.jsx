import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './styles.css';  

const MaterialTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dragStart, setDragStart] = useState(null);

  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!dragStart) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const indicator = document.querySelector('.indicator');
    const diff = currentX - dragStart;
    const newLeft = activeTab === 0 ? Math.max(0, Math.min(diff, 100)) : Math.max(-100, Math.min(0, diff));
    
    indicator.style.transform = `translateX(${activeTab === 0 ? newLeft : 100 + newLeft}px)`;
    indicator.style.width = `${Math.max(24, 60 + Math.abs(newLeft/2))}px`;
    
    if (Math.abs(diff) > 80) {
      setActiveTab(activeTab === 0 ? 1 : 0);
      setDragStart(null);
    }
  };

  const handleDragEnd = () => {
    setDragStart(null);
    const indicator = document.querySelector('.indicator');
    indicator.style.transform = `translateX(${activeTab === 0 ? 0 : 100}px)`;
    indicator.style.width = activeTab === 0 ? '24px' : '60px';
  };

  return (
    <div className="tab-container"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
        <Star />
      </div>
      <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
        My Tasks
      </div>
      <div className="indicator" style={{ 
        transform: `translateX(${activeTab === 0 ? 0 : 100}px)`,
        width: activeTab === 0 ? '24px' : '60px'
      }} />
    </div>
  );
};

export default MaterialTabs;