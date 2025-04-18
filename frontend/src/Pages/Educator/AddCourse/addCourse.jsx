import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../../assets/assets';
import uniqid from 'uniqid';

const AddCourse = () => {
  const quillRef = useRef();
  const editorRef = useRef();

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapter, setChapter] = useState([]);
  const [showPopPup, setShowPopPup] = useState(false);
  const [chapterId, setChapterId] = useState(null);

  const [lecturesDetails, setLecturesDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureURL: '',
    isPreView: false,
  });

  const handleChapter = (action, chapterIdParam) => {
    if (action === 'add') {
      const title = prompt('Enter your title');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapter.length > 0 ? chapter.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapter([...chapter, newChapter]);
      }
    } else if (action === 'remove') {
      setChapter(chapter.filter((item) => item.chapterId !== chapterIdParam));
    } else if (action === 'toggle') {
      setChapter(
        chapter.map((item) =>
          item.chapterId === chapterIdParam ? { ...item, collapsed: !item.collapsed } : item
        )
      );
    }
  };

  const handleLecture = (action, chapterIdParam, lectureId) => {
    if (action === 'add' && chapterId) {
      const updatedChapter = chapter.map((item) => {
        if (item.chapterId === chapterId) {
          return {
            ...item,
            chapterContent: [
              ...item.chapterContent,
              {
                lectureId: uniqid(),
                ...lecturesDetails,
              },
            ],
          };
        }
        return item;
      });
  
      setChapter(updatedChapter);
      setLecturesDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureURL: '',
        isPreView: false,
      });
      setShowPopPup(false);
    }
  
    else if (action === "remove" && chapterIdParam && lectureId) {
      const updatedChapter = chapter.map((item) => {
        if (item.chapterId === chapterIdParam) {
          return {
            ...item,
            chapterContent: item.chapterContent.filter(
              (lecture) => lecture.lectureId !== lectureId
            ),
          };
        }
        return item;
      });
  
      setChapter(updatedChapter);
    }
  };
  
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0 pt-8">
      <form className="flex flex-col gap-4 max-w-md w-full text-gray-500">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-gray-700">Course Title</p>
          <input
            type="text"
            placeholder="type here"
            className="px-3 md:py-2.5 py-2 outline-none border border-gray-500 rounded bg-gray-100"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-gray-700">Course Description</p>
          <div ref={editorRef} className="bg-gray-100 rounded"></div>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-gray-700">Course Price</p>
            <input
              type="number"
              placeholder="0"
              className="px-3 md:py-2.5 py-2 outline-none border border-gray-500 rounded bg-gray-100"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <p className="text-base font-medium text-gray-700">Course Thumbnail</p>
            <div className="flex gap-3">
              <label htmlFor="thumbnailImage" className="flex items-center gap-3">
                <img
                  src={assets.file_upload_icon}
                  alt="file"
                  className="p-3 bg-blue-500 rounded"
                />
                <input
                  type="file"
                  id="thumbnailImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  hidden
                />
                <img
                  className="max-h-10"
                  src={image ? URL.createObjectURL(image) : ''}
                  alt=""
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <p className="text-base font-medium text-gray-700">Discount %</p>
          <input
            type="number"
            placeholder="0%"
            min={0}
            max={100}
            className="px-3 md:py-2.5 py-2 outline-none border border-gray-500 rounded bg-gray-100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>

        {/* Adding chapter details */}
        <div>
          {chapter.map((item, index) => {
            return (
              <div key={item.chapterId} className="bg-gray-100 border border-gray-500 rounded-lg mb-4">
                <div className="flex justify-between items-center p-4 border-b">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleChapter('toggle', item.chapterId)}
                  >
                    <img
                      src={assets.dropdown_icon}
                      width={14}
                      alt="drop"
                      className={`mr-2 transition-all ${item.collapsed && '-rotate-90'}`}
                    />
                    <span className="font-semibold">
                      {index + 1}. {item.chapterTitle}
                    </span>
                  </div>

                  <span className="text-gray-500">{item.chapterContent.length} Lectures</span>
                  <img
                    src={assets.cross_icon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => handleChapter('remove', item.chapterId)}
                  />
                </div>

                {!item.collapsed && (
                  <div className="p-4">
                    {item.chapterContent.map((lecture, index) => {
                      return (
                        <div key={lecture.lectureId} className="flex justify-between items-center mb-2">
                          <span>
                            {index + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                            <a href={lecture.lectureURL} target="_blank" className="text-blue-600">
                              Link
                            </a>{' '}
                            - {lecture.isPreView ? 'Free Preview' : 'Paid'}
                          </span>
                          <img src={assets.cross_icon} alt="cross" className="cursor-pointer" onClick={() => handleLecture('remove', item.chapterId, lecture.lectureId)}/>  
                        </div>
                      );
                    })}

                    <div
                      className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                      onClick={() => {
                        setChapterId(item.chapterId);
                        setShowPopPup(true);
                      }}
                    >
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div
            className="flex justify-center items-center bg-blue-200 p-2 rounded-lg cursor-pointer"
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>

          {showPopPup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-gray-100 text-gray-800 p-4 rounded relative w-full max-w-80">
                <h2 className="font-semibold text-lg mb-4">Add Lecture</h2>

                <div className="mb-2">
                  <p className="text-base font-medium text-gray-700">Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lecturesDetails.lectureTitle}
                    onChange={(e) =>
                      setLecturesDetails({ ...lecturesDetails, lectureTitle: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p className="text-base font-medium text-gray-700">Duration (Minutes)</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lecturesDetails.lectureDuration}
                    onChange={(e) =>
                      setLecturesDetails({ ...lecturesDetails, lectureDuration: e.target.value })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p className="text-base font-medium text-gray-700">Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lecturesDetails.lectureURL}
                    onChange={(e) =>
                      setLecturesDetails({ ...lecturesDetails, lectureURL: e.target.value })
                    }
                  />
                </div>

                <div className="py-4 flex gap-2 items-center">
                  <p className="text-base font-medium text-gray-700">Is Preview Free</p>
                  <input
                    type="checkbox"
                    checked={lecturesDetails.isPreView}
                    onChange={(e) =>
                      setLecturesDetails({ ...lecturesDetails, isPreView: e.target.checked })
                    }
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleLecture('add')}
                >
                  Add
                </button>

                <img
                  src={assets.cross_icon}
                  alt="cross"
                  onClick={() => setShowPopPup(false)}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="bg-black text-white w-max py-2.5 px-8 my-4 rounded ml-5">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
