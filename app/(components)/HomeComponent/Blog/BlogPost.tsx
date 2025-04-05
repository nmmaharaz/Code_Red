import { useState } from "react";
import Blogs from "./Blogs";
export default function BlogPost() {
  const [Question, setQuestion] = useState(false);
  const [Blog, setBlog] = useState(true);
  const handleCheckboxChange = () => {
    setQuestion((prev) => !prev);
    setBlog((prev) => !prev);
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle">
      <div className="">
        <div className="flex items-center justify-center bg-opacity-50 p-4">
          <div className="bg-white rounded-lg mx-auto max-w-xl shadow-lg p-4">
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Create New Post
              </h2>
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                    checked={Question}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-gray-700 text-sm">Question</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                    checked={Blog}
                    onChange={handleCheckboxChange}
                  />
                  <span className="text-gray-700 text-sm">Blog</span>
                </label>
              </div>
              <button
                onClick={() => document.getElementById("my_modal_5")?.close()}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {Blog ? (
              <Blogs></Blogs>
            ) : (
              <div className="flex items-center justify-center h-48">
                <p className="text-gray-500">Question</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
