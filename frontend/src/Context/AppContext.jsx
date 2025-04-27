import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext=createContext();

const AppContextProvider=(props)=>{

    const [allCourse,setAllCourse]=useState([]);
    const [isEducator,setIsEducator]=useState(true);
    const [input,setInput]=useState("");
    const [enrolledCourse,setEnrolledCourse]=useState([]);
    const [token, setToken] = useState("");

    const fetchCourse=async()=>{
         try {
            const response=await axios.get("http://localhost:2000/getCourse");
            if(response){
                setAllCourse(response.data.courses);
            }

            else{
                toast.error(response.Massage);
            }
        }
        catch (error) {
            toast.error(error.Message);
        }
    };

    const calculateTotalRating=(course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }

        let totalRating=0;
        
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        });

        return totalRating/course.courseRatings.length;
    };

    const calculateLectureTime=(chapter)=>{
        let time=0;

        chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration);
        return humanizeDuration(time*60*1000,{units:["h","m"]});
    };

    const calculateCourseTime=(course)=>{
        let time=0;

        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration));
        return humanizeDuration(time*60*1000,{units:["h","m"]});
    };

    const calculateNOL=(course)=>{
        let totalLectures=0;

        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length;
            }
        })
        return totalLectures;
    };

    const fetchEnrolledCourse = async () => {
        try {
          const tokens = localStorage.getItem("token");
      
          const response = await axios.post(
            "http://localhost:2000/enrolled-data",
            {},
            { headers: { token: tokens } }
          );
      
          console.log(tokens);
      
          if (response && response.data) {
            setEnrolledCourse(response.data.enrolledCourses);
            console.log(response.data);
          } else {
            toast.error(response.data?.Message || "Failed to fetch enrolled courses");
          }
      
        } catch (error) {
          toast.error(error.message || "Something went wrong");
        }
      };
      
      // This is fine
      useEffect(() => {
        fetchCourse();
      }, []);
      
      // Minor improvement in tokens checking
      useEffect(() => {
        const tokens = localStorage.getItem("token");
        if (tokens) {
          fetchEnrolledCourse();
        }
      }, [token]);

    const value={
        allCourse,calculateTotalRating,isEducator,setIsEducator,input,setInput,calculateNOL,calculateLectureTime,calculateCourseTime,enrolledCourse,setEnrolledCourse,fetchEnrolledCourse,token, setToken
    };

    // Does not log out when usen refresh web-page
    useEffect(()=>{
        const loadData=async()=>{
            const savedToken=localStorage.getItem("token");
            if(savedToken){
                setToken(savedToken);
            }
        };
        loadData();
    },[]);

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export {AppContext,AppContextProvider};