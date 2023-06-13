import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PostFeed from './PostFeed';
import { useRouter } from 'next/router';
import User from '@/interfaces/User';
import InfoBar from './InfoBar';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const router = useRouter();

  if (user) {
    return (
      <div className="flex flex-col h-screen">
        <div className="nav_bar">
          <Navbar user={user} />
        </div>
        <div className="content flex ">
          <Sidebar />
          <PostFeed />
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
