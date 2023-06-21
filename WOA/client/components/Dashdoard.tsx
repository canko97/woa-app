import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PostFeed from './PostFeed';
import AccountPage from './AccountPage';
import { useRouter } from 'next/router';
import User from '@/interfaces/User';
import InfoBar from './InfoBar';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const router = useRouter();

  const [mainContent, setMainContent] = useState('PostFeed');

  const handleContentChange = (content: string) => {
    setMainContent(content);
  };

  if (user) {
    let contentComponent;

    if (mainContent === 'PostFeed') {
      contentComponent = <PostFeed />;
    } else if (mainContent === 'Account') {
      contentComponent = <AccountPage user={user} />;
    }

    return (
      <div className="flex flex-col h-screen">
        <div className="nav_bar">
          <Navbar user={user} onContentChange={handleContentChange} />
        </div>
        <div className="content flex">
          <Sidebar onContentChange={handleContentChange} />
          {contentComponent}
          <InfoBar />
        </div>
      </div>
    );
  } else {
    router.push('/');
    return null;
  }
};

export default Dashboard;
