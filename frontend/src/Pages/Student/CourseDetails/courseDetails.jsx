import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';
import Loading from '../../../Components/Student/Loading/loading';
import { assets } from '../../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../../Components/Student/Footer/footer';
import YouTube from 'react-youtube';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { id } = useParams();
  const {
    allCourse,
    calculateTotalRating,
    calculateNOL,
    calculateLectureTime,
    calculateCourseTime,
    enrolledStudents,
    token
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState(false);
  const [playVideo, setPlayVideo] = useState(null);
  const navigate=useNavigate();

  const fetchCourse = async () => {
    const response=await axios.get("https://lms-backend-sgs2.onrender.com/getCourseById/"+id);
    setCourseData(response.data.courseData);
  };

  const enrollCourse = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.warning("Please login to enroll in the course.");
        return;
      }
  
      // Step 1: Request order creation from backend
      const enrollResponse = await axios.post(
        "https://lms-backend-sgs2.onrender.com/payment",
        { courseId: id },
        {
          headers: {
            token: token,
          },
        }
      );
  
      const { Status, order, amount, purchaseId, Message } = enrollResponse.data;
  
      if (Status === "500" && Message === "already enrolled") {
        toast.info("You are already enrolled in this course.");
        return;
      }
  
      if (Status !== "200" || !order || !purchaseId) {
        toast.error("Failed to initialize payment.");
        return;
      }
  
      // Step 2: Configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_YourKeyHere", // fallback for testing
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Tanish Learning Center",
        description: "Course Enrollment",
        image: "https://example.com/logo.png", // optional
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Send payment confirmation to backend
          try {
            const validationResponse = await axios.post(
              "https://lms-backend-sgs2.onrender.com/payment/validate",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                purchaseId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            if (validationResponse.data.Status === "200") {
              toast.success("Payment successful! You're enrolled.");
              navigate("/final");
            } else {
              toast.error("Payment validation failed.");
            }
          } catch (error) {
          }
        },
        prefill: {
          name: "Student",
          email: "tanish281202@gmail.com",
          contact: "9572973654",
        },
        notes: {
          courseId: id,
          purchaseId,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      // Step 4: Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
      toast.success("Payment successful! You're enrolled.");
      navigate("/final");
  
      rzp.on("payment.failed", function (response) {
        toast.error("Payment failed. Try again.");
        console.error("Razorpay payment failed:", response.error);
      });
  
    } catch (error) {
    }
  };

  
  useEffect(() => {
    fetchCourse();
  }, [allCourse]);

  return courseData ? (
    <>
      <div className='flex flex-col-reverse md:flex-row gap-10 items-start justify-center px-4 md:px-20 lg:px-36 py-10 bg-gradient-to-b from-cyan-100/70'>

        {/* Left Part*/}
        <div className='flex flex-col w-full md:w-2/3'>
          {/* Course Title & Info */}
          <div className='max-w-xl text-gray-600'>
            <h1 className='md:text-course-details-heading-larger text-course-details-heading-small font-semibold text-gray-900'>
              {courseData.courseTitle}
            </h1>
            <p
              className='pt-4 md:text-base text-sm'
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 230)
              }}
            ></p>
          </div>

          {/* Rating, Enrolled Info */}
          <div className='flex items-center space-x-2 pt-4 pb-1 text-sm'>
            <p className='font-semibold'>{calculateTotalRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img
                  className='w-3.5 h-3.5'
                  src={
                    i < Math.floor(calculateTotalRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  key={i}
                  alt='star'
                />
              ))}
            </div>
            <p className='text-blue-600'>
              ({courseData.courseRatings.length}{' '}
              {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})
            </p>
            <p className='text-gray-600'>
              {courseData.enrolledStudents && courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents && courseData.enrolledStudents.length > 1 ? 'students' : 'student'}
            </p>
          </div>

          {/* Educator */}
          <p className='text-sm'>
            Course by{' '}
            <span className='text-blue-600 underline'>{courseData.educator}</span>
          </p>

          {/* Course Structure */}
          <div className='text-gray-900 w-full max-w-xl'>
            <div>
              <h2 className='text-2xl font-semibold mt-10'>Course Structure</h2>
              <p className='text-gray-950 text-sm'>{calculateNOL(courseData)} lectures - {calculateCourseTime(courseData)} (total duration)</p>
            </div>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => {
                const isOpen = openSection === index;
                return (
                  <div
                    key={index}
                    className='border border-gray-400 rounded mb-2 bg-gray-100'
                  >
                    <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                      onClick={() =>
                        setOpenSection(prev => (prev === index ? null : index))
                      }>
                      <div className='flex gap-5 items-center'>
                        <img src={assets.down_arrow_icon} alt='down' />
                        <p className='font-medium md:text-base text-sm'>
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className='text-sm md:text-default'>
                        {chapter.chapterContent.length} lectures -{' '}
                        {calculateLectureTime(chapter)}
                      </p>
                    </div>

                    {isOpen && (
                      <div className='overflow-hidden transition-all duration-300 max-h-96'>
                        <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-700 border-t border-gray-400'>
                          {chapter.chapterContent.map((lecture, i) => (
                            <li key={i} className='flex items-start gap-2 py-1'>
                              <img
                                src={assets.play_icon}
                                alt='play'
                                className='w-4 h-4 mt-1'
                              />
                              <div className='flex items-center justify-between w-full text-gray-900 text-xs md:text-default'>
                                <p>{lecture.lectureTitle}</p>
                                <div className='flex gap-2'>
                                  {lecture.isPreviewFree && (
                                    <p className='text-blue-600 cursor-pointer' onClick={() => setPlayVideo({ videoId: lecture.lectureUrl.split("/").pop() })}>
                                      Preview
                                    </p>
                                  )}
                                  <p>
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ['h', 'm'] }
                                    )}
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
          </div>

          {/* Course Description */}
          <div className='max-w-xl w-full mt-4 pb-10'>
            <p
              className='pt-1 rich-text'
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
              }}
            ></p>
          </div>
        </div>


        {/* Right Part*/}
        <div className='flex flex-col w-full md:w-2/4 top-24 border shadow-xl rounded pb-5 md:mt-10 mt-0'>

          {
            playVideo
              ?<><YouTube videoId={playVideo.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' /> <button className='text-red-700 underline text-left text-base my-2 ml-5' onClick={()=>setPlayVideo(null)}>close video</button></>
              : <img src={courseData.courseThumbnail} alt="image" className='rounded' />
          }

          <div className='px-5'>

            <div className='flex gap-2 mt-2'>
              <img src={assets.time_left_clock_icon} alt="time" />
              <p className='text-red-600 text-base'><span className='font-medium'>5 days</span> left at this price!</p>
            </div>

            <div className='flex gap-3 mt-1'>
              <p className='text-2xl font-bold text-gray-900'>Rs.{((courseData.coursePrice - courseData.discount * courseData.coursePrice / 100) * 85).toFixed(2)}</p>
              <p className='text-base font-semibold text-gray-800 mt-1 line-through'>Rs.{((courseData.coursePrice) * 85).toFixed(2)}</p>
              <p className='text-base font-semibold text-gray-900 mt-1'>{courseData.discount}% of</p>
            </div>

            <div className='flex gap-3 mt-1'>

              <div className='flex gap-1'>
                <img className='w-3.5 h-3.5 mt-0.5' src={assets.star} alt="star" ></img>
                <p className='text-gray-800'>{calculateTotalRating(courseData)}</p>
              </div>

              |

              <div className='flex gap-1'>
                <img src={assets.time_clock_icon} alt="time" />
                <p className='text-gray-800'>{calculateCourseTime(courseData)}</p>
              </div>

              |

              <div className='flex gap-1'>
                <img src={assets.lesson_icon} alt="lesson" />
                <p className='text-gray-800'>{calculateNOL(courseData)} lessons</p>
              </div>

            </div>

            <div className='mt-3'>
              <button className='bg-blue-600 text-white w-full md:px-10 px-7 py-2 rounded-md text-base' onClick={enrollCourse}>Enroll Now</button>
            </div>

            <div className='mt-5'>
              <h2 className='font-semibold text-xl'>What's in the course?</h2>
              <ul className='mt-3 list-disc px-5 text-gray-600'>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
                <li>Quizzes to test your knowledge.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* ✅ Footer is outside main content so it comes after all */}
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
