import React, { useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../../assets/assets';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!dashboardData) return <div>Loading...</div>; // Add loading state

  return (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0 pt-8 gap-8">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">

          {/* Total Enrollments */}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-4 w-60 rounded-md">
            <img src={assets.patients_icon} alt="students" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-base text-gray-500">Total Enrollments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-4 w-60 rounded-md">
            <img src={assets.appointments_icon} alt="courses" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashboardData.totalCourses}
              </p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="flex items-center gap-3 shadow-card border border-blue-600 p-4 w-60 rounded-md">
            <img src={assets.earning_icon} alt="earnings" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                Rs.{dashboardData.totalEarnings * 85}
              </p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Latest Enrollments Table */}
        <div>
          <h2 className="pb-4 text-lg font-bold">Latest Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-gray-100 border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-black border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-bold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-bold">Student Name</th>
                  <th className="px-4 py-3 font-bold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr className="border-b border-gray-500/20" key={index}>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img src={item.student.imageUrl} alt="student" className="w-9 h-9 rounded-full" />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
