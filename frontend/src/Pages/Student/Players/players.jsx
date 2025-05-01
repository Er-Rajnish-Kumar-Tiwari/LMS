import humanizeDuration from 'humanize-duration';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { assets } from '../../../assets/assets';
import { AppContext } from '../../../Context/AppContext';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Footer from '../../../Components/Student/Footer/footer';
import Rating from '../../../Components/Student/Rating/rating';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../../Components/Student/Loading/loading';

const BASE_URL = 'https://lms-backend-sgs2.onrender.com'; 

const Players = () => {
  const {
    calculateNOL,
    calculateLectureTime,
    calculateCourseTime,
    enrolledCourse,
    fetchEnrolledCourse
  } = useContext(AppContext);

  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [playVideo, setPlayVideo] = useState(null);
  const [intialRatings, setIntialRatings] = useState(0);
  const [ProgressData, setProgressData] = useState(null);
  const token = localStorage.getItem("token");

  // JWT parsing
  const parseJwt = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid JWT token:", error);
      return null;
    }
  };

  const userId = useMemo(() => parseJwt(token)?.id, [token]);

  const getCourse = () => {
    const foundCourse = enrolledCourse.find(course => course._id === courseId);
    if (foundCourse) {
      setCourseData(foundCourse);

      const userRating = foundCourse.courseRatings?.find(r => r.userId === userId);
      if (userRating) {
        setIntialRatings(userRating.rating);
      }
    }
  };

  useEffect(() => {
    if (userId && enrolledCourse.length > 0) {
      getCourse();
    }
  }, [enrolledCourse,userId]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/update-course-progress`,
        { courseId, lectureId },
        { headers: { token } }
      );
      if (response) {
        toast.success(response.data.Massage);
        getCourseProgress();
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Could not mark lecture as complete.");
    }
  };

  const getCourseProgress = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/get-course-progress`,
        { courseId },
        { headers: { token } }
      );
      if (response) {
        setProgressData(response.data.progressData);
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Failed to fetch progress.");
    }
  };

  const handleRate = async (rating) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-ratings`,
        { courseId, ratings: rating },
        { headers: { token } }
      );
      if (response) {
        toast.success(response.data.Message);
        setIntialRatings(rating);
        await fetchEnrolledCourse();
        getCourse();
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "Failed to submit rating.");
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 px-10 lg:px-36'>
        {/* Left - Course Structure */}
        <div>
          <h2 className='text-2xl font-semibold md:mt-10 mt-0'>Course Structure</h2>
          <p className='text-gray-950 text-sm'>
            {calculateNOL(courseData)} lectures - {calculateCourseTime(courseData)} (total duration)
          </p>

          <div className='pt-5'>
            {courseData.courseContent.map((chapter, index) => {
              const isOpen = openSection === index;
              return (
                <div key={index} className='border border-gray-400 rounded mb-2 bg-gray-100'>
                  <div
                    className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                    onClick={() => setOpenSection(prev => (prev === index ? null : index))}
                  >
                    <div className='flex gap-5 items-center'>
                      <img
                        src={assets.down_arrow_icon}
                        alt='down'
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                      <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} lectures - {calculateLectureTime(chapter)}
                    </p>
                  </div>

                  {isOpen && (
                    <div className='overflow-hidden transition-all duration-300 max-h-96'>
                      <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-700 border-t border-gray-400'>
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className='flex items-start gap-2 py-1'>
                            <img
                              src={
                                ProgressData?.lectureCompleted?.some(id => String(id) === String(lecture.lectureId))
                                  ? assets.blue_tick_icon
                                  : assets.play_icon
                              }
                              alt='play'
                              className='w-4 h-4 mt-1'
                            />
                            <div className='flex items-center justify-between w-full text-gray-900 text-xs md:text-default'>
                              <p>{lecture.lectureTitle}</p>
                              <div className='flex gap-2'>
                                {lecture.lectureUrl ? (
                                  <p
                                    className='text-blue-600 cursor-pointer'
                                    onClick={() =>
                                      setPlayVideo({
                                        ...lecture,
                                        chapter: index + 1,
                                        lecture: i + 1,
                                        videoId: lecture.lectureUrl.split('/').pop()
                                      })
                                    }
                                  >
                                    Watch
                                  </p>
                                ) : (
                                  <span className="text-red-500 text-xs">No video</span>
                                )}
                                <p>
                                  {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                    units: ['h', 'm']
                                  })}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2 py-3 mt-5'>
            <h1 className='font-semibold md:text-2xl text-base'>Rate this Course :</h1>
            <Rating intialRating={intialRatings} onRate={handleRate} />
          </div>
        </div>

        {/* Right - Video Player */}
        <div className='w-full border shadow-xl md:mt-10 mt-0 mb-10'>
          {playVideo ? (
            <>
              <YouTube
                videoId={playVideo.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName='w-full aspect-video'
              />
              <button
                className='text-red-700 underline text-left text-base my-1 ml-5'
                onClick={() => setPlayVideo(null)}
              >
                Close video
              </button>
              <div className='flex items-center px-5 justify-between pb-3'>
                <p className='text-gray-600 text-sm'>
                  {playVideo.chapter}.{playVideo.lecture} {playVideo.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsCompleted(playVideo.lectureId)}
                  className='text-blue-600 bg-gray-200 md:px-3 py-1 rounded'
                >
                  {ProgressData?.lectureCompleted?.some(id => String(id) === String(playVideo.lectureId))
                    ? 'Completed'
                    : 'Mark Complete'}
                </button>
              </div>
            </>
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="Course Thumbnail"
              className='rounded-md'
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Players;
