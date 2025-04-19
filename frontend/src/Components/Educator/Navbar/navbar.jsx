import React from 'react';
import { assets, dummyEducatorData } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 bg-gray-300'>
      <img
        src={assets.logo}
        alt="logo"
        onClick={() => navigate('/')}
        className='w-28 lg:w-32 cursor-pointer'
      />

      <div className='flex gap-2 items-center'>
        <p className='text-base'>
          Hi! {isAuthenticated ? user?.name || user?.email : 'Developer'}
        </p>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm underline"
          >
            Logout
          </button>
        ) : (
          <img
            src={assets.profile_img}
            alt="Profile"
            onClick={() => loginWithRedirect()}
            className="cursor-pointer w-8 h-8"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
