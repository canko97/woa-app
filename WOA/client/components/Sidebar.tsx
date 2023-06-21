import React, { useState } from 'react';

interface SidebarProps {
  onContentChange: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onContentChange }) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat((prevState) => !prevState);
  };

  const handleDashboardClick = () => {
    onContentChange('PostFeed');
  };

  return (
    <div className="w-3/12 bg-slate-100 border-r flex flex-col ">
      <button
        onClick={handleDashboardClick}
        className="mx-2 p-2 mt-4 rounded shadow bg-white"
      >
        Dashboard
      </button>
      <div className="mx-2 h-px bg-gray-300 mt-4 shadow"></div>
      <button
        onClick={toggleChat}
        className="mx-2 p-2 mt-4 rounded shadow bg-white"
      >
        Chat
      </button>
    </div>
  );
};

export default Sidebar;
