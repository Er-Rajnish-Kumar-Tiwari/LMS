import { assets } from '../../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: assets.home_icon },
    { name: "Add Course", path: "/add-course", icon: assets.add_icon },
    { name: "My Course", path: "/my-course", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/student-enrolled", icon: assets.person_tick_icon },    
  ];

  return (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-500 flex flex-col py-2 bg-gradient-to-b from-cyan-100/30">
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 border-b border-blue-200 ${
              isActive
                ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                : "hover:bg-gray-100/90"
            }`
          }
        >
          <img src={item.icon} alt="icon" className="w-6 h-6" />
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
