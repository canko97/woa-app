import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  // const [showChat, setShowChat] = useState(false);

  // const toggleChat = () => {
  //   setShowChat((prevState) => !prevState);
  // };

  return (
    <div className="w-3/12 bg-slate-100 border-r flex flex-col ">
      <div className="mx-2 p-2 mt-4 rounded shadow bg-white">🟢 User 1</div>
      <div className="mx-2 p-2 mt-4 rounded shadow bg-white">🔴 User 2</div>
    </div>
  );
};

export default Sidebar;
