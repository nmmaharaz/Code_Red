import { useState } from "react";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
function Blogs() {
    const {data} = useSession()
    const [images, setImages] = useState<string[]>([]);
    const [GroupShere, setGroupShere] = useState(false);
    console.log(GroupShere, "setGroupShere");
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newImages = Array.from(event.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        setImages((prev) => [...prev, ...newImages]);
      }
    };
  
    const removeImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
    };

    const handleBlogPost = async(e)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const description = (form.elements.namedItem("description") as HTMLInputElement).value;
        const image = images
        const url = (form.elements.namedItem("url") as HTMLInputElement).value;
        const group = (form.elements.namedItem("group") as HTMLInputElement).value;
        const BlogInfo ={
            email: data?.user?.email,
            description,
            image,
            url,
            group
        }
        const postBlogInfo = await axios.post("http://localhost:3000/api/blog", BlogInfo);
        console.log(postBlogInfo, "postBlogInfo")
        if(postBlogInfo?.data?.success){
            toast.success("Blog Posted Successfully");
            form.reset();
            setImages([]);
            document.getElementById("my_modal_5")?.close()
        }
    }

  return (
    <form onSubmit={handleBlogPost}>
        <textarea
            name="description"
            rows={5}
            className="w-full mt-3 p-2 border text-sm border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's On Your Mind?"
          />

          <div className="max-w-md mt-3 mx-auto bg-white p-4 rounded-lg shadow-sm">
            <label className="border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col items-center cursor-pointer">
              <span className="text-gray-600">
                Click to upload or drag & drop
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {images.length > 0 && (
              <div className="border rounded-lg p-3 mt-4 grid grid-cols-3 gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      height={500}
                      width={500}
                      alt="Uploaded"
                      className="w-full rounded-md h-24 object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <XCircle className="text-red-500 w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between gap-3">
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                    defaultChecked
                  />
                  <span className="text-gray-700 text-sm">Activity Feed</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="text-blue-500"
                    onClick={() => setGroupShere(!GroupShere)}
                  />
                  <span className="text-gray-700 text-sm">My Story</span>
                </label>
              </div>
              <select
              name="group"
                disabled={!GroupShere}
                className="disabled:cursor-not-allowed cursor-pointer text-sm mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              >
                <option value="" className="text-sm">Select Group</option>
                <option className="text-sm">Code Red</option>
                <option className="text-sm">Coder Man</option>
                <option className="text-sm">Programmer Helper</option>
              </select>
            </div>
          </div>
          <input
          name="url"
            placeholder="https://www.youtube.com/watch?v=vgvsuiFlA-Y"
            className="text-sm border border-gray-300 w-full px-4 rounded-md py-2 text-blue-500 mt-3"
            type="url"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button type="submit" className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Publish
            </button>
          </div>
    </form>
  )
}

export default Blogs