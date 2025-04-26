import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

const AppContext=createContext();

const AppContextProvider=(props)=>{

    const [allCourse,setAllCourse]=useState([]);
    const [isEducator,setIsEducator]=useState(true);
    const [input,setInput]=useState("");
    const [enrolledCourse,setEnrolledCourse]=useState([]);
    const [token, setToken] = useState("");

    const fetchCourse=async()=>{
         setAllCourse(dummyCourses);
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

    const fetchEnrolledCourse=async()=>{
        setEnrolledCourse(dummyCourses);
    };

    useEffect(()=>{
        fetchCourse();
        fetchEnrolledCourse();
    },[]);

    const value={
        allCourse,calculateTotalRating,isEducator,setIsEducator,input,setInput,calculateNOL,calculateLectureTime,calculateCourseTime,enrolledCourse,setEnrolledCourse,fetchEnrolledCourse,token, setToken
    };

    // Does not log out when usen refresh web-page
    useEffect(()=>{
        const loadData=async()=>{
            const savedToken=localStorage.getItem("token");
            if(savedToken){
                console.log(savedToken);
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