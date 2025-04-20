import React, { useContext } from 'react';
import { assets } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import { toast } from 'react-toastify';

const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const { token, setToken} = useContext(AppContext);

  const isAuthenticated = !!token;

  const handleLogout = () => {
    setToken('');
    toast.success('Logged out successfully!');
    navigate('/');
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
          Hi! {isAuthenticated ? 'Educator' : 'Developer'}
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
            onClick={() => setShowLogin(true)}
            className="cursor-pointer w-8 h-8"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
