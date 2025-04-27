import React, { useContext } from 'react';
import { assets } from '../../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import { toast } from 'react-toastify';

const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const { isEducator, setIsEducator, token, setToken} = useContext(AppContext);

  const isAuthenticated = !!token;

  const handleLogout = () => {
    setToken('');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 bg-cyan-100/70">
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {isAuthenticated && (
          <>
            <Link to="/my-enrollment" className='text-base'>My Enrollments</Link>
          </>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-red-500 bg-gray-200 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-5 sm:gap-5 text-gray-500">
        {isAuthenticated && (
          <>
            <Link to="/my-enrollment" className='text-base'>My Enrollments</Link>
          </>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout}  className="text-red-500 bg-gray-200 px-1 py-1 rounded">
             Logout
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)}>
            <img src={assets.user_icon} alt="Login" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
