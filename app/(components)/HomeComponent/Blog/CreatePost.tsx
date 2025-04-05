import { FileQuestion } from "lucide-react";
import BlogPost from "./BlogPost";
import QuestionPost from "../question/QuestionPost";

export default function CreatePost() {
    return (
      <div className="w-full mt-4 mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Create New Post</h2>
        <div className="mt-2 flex items-center space-x-2 border border-gray-400 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100">
          <span className="text-gray-400 text-sm">✏️</span>
          <input
            type="text"
            placeholder="Create New Post"
            className="w-full bg-transparent outline-none text-sm text-gray-600"
          />
        </div>
        <div className="mt-3 flex items-center justify-around text-sm text-gray-600">
          <button onClick={()=>document.getElementById('my_modal_6').showModal()} className="flex items-center space-x-1 hover:text-blue-600">
            <FileQuestion size={16}/>
            <span>Question</span>
          </button>
          <button onClick={()=>document.getElementById('my_modal_5').showModal()} className="flex items-center space-x-1 hover:text-yellow-500">
            <span>😊</span>
            <span>Blog</span>
          </button>
        </div>
        <BlogPost></BlogPost>
        <QuestionPost></QuestionPost>
      </div>
    );
  }
  