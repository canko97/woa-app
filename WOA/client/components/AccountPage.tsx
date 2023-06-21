import User from '@/interfaces/User';
import axios from 'axios';
import router from 'next/router';
import { useState } from 'react';

interface AccountPageProps {
  user: User;
}

const AccountPage: React.FC<AccountPageProps> = ({ user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER_ENDPOINT}/api/auth/users/delete`,
        { withCredentials: true }
      );

      router.reload();
    } catch (error) {}
    console.log('Account deleted!');
  };

  const handleConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    handleDeleteAccount();
    setShowConfirmation(false);
  };

  return (
    <div className="pt-6 w-10/12 flex flex-col items-center overflow-y-auto no-scrollbar">
      <div className="bg-white p-6 rounded-lg shadow-md p-32">
        <div className="flex flex-col space-y-4">
          <div>
            <span className="font-bold">First Name:</span>
            <span className="ml-2">{user.firstName}</span>
          </div>
          <div>
            <span className="font-bold">Last Name:</span>
            <span className="ml-2">{user.lastName}</span>
          </div>
          <div>
            <span className="font-bold">Email:</span>
            <span className="ml-2">{user.email}</span>
          </div>
        </div>
        {showConfirmation ? (
          <div className="mt-6 space-x-4">
            <p className="text-red-500 ">
              Deleting your account is an irreversible action.
            </p>
            <p className="text-red-500 pb-2">
              All your data and posts will be deleted
            </p>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Confirm Delete
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleConfirmation}
            className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
