import { useNavigate } from 'react-router-dom';
import { assets } from '../../../assets/assets';

const Navbar = () => {
  const navigate=useNavigate();

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 bg-gray-300'>
      <img
        src={assets.logo}
        alt="logo"
        className='w-28 lg:w-32 cursor-pointer'
        onClick={()=>navigate("/")}
      />

      <div className='flex gap-2 items-center'>
        <p className='text-base'>
          Hi! Educator
        </p>
        
          <img
            src={assets.profile_img}
            alt="Profile"
            className="cursor-pointer w-8 h-8"
          />
      
      </div>
    </div>
  );
};

export default Navbar;
