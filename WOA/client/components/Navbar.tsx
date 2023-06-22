import React from 'react';
import Image from 'next/image';
import User from '@/interfaces/User';
import axios from 'axios';
import { useRouter } from 'next/router';
import KeepAlive from './KeepAlive';

interface NavbarProps {
  user: User;
  onContentChange: (content: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onContentChange }) => {
  const router = useRouter();

  async function logOut() {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_AUTH_SERVER_ENDPOINT}/api/auth/sessions/delete`,
      { withCredentials: true }
    );
    router.reload();
  }

  const handleAccountClick = () => {
    onContentChange('Account');
  };

  return (
    <div className="bg-white border-b h-full flex justify-between p-2 ">
      <KeepAlive />
      <div className="flex justify-between">
        <Image
          src="/feathersjs.svg"
          alt="Logo"
          width={80}
          height={100}
          style={{ objectFit: 'contain', paddingLeft: '10px' }}
        />
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-xl">
            Workplace Organization Application
          </p>
        </div>
      </div>
      <div>
        <button
          className="text-center text-xl mr-3"
          onClick={handleAccountClick}
        >
          {user.firstName} {user.lastName}
        </button>
        <button onClick={logOut} className="text-center text-xl mr-5">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
