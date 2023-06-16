import React from 'react';
import Image from 'next/image';
import User from '@/interfaces/User';
import axios from 'axios';
import { useRouter } from 'next/router';
import KeepAlive from './KeepAlive';

const Navbar: React.FC<{ user: User }> = ({ user }: { user: User }) => {
  const router = useRouter();

  async function logOut() {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_AUTH_SERVER_ENDPOINT}/api/auth/sessions/delete`,
      { withCredentials: true }
    );
    router.reload();
  }

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
      <div className="flex items-center justify-center  h-full">
        <button className="text-center text-xl">{user.session}</button>
      </div>
      <div className="flex items-center justify-center  h-full">
        <button onClick={logOut} className="text-center text-xl">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
