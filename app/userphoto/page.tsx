"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function UserPhoto() {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const dropzone = dropzoneRef.current;
    const fileInput = fileInputRef.current;

    if (!dropzone || !fileInput) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      if (e.dataTransfer.files.length > 0) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        handleFileSelect(target.files[0]);
      }
    };

    const handleFileSelect = (file: File) => {
      if (file && file.type.startsWith("image/")) {
        displayPreview(file);
        uploadImage(file);
      } else {
        toast.error("Please upload a valid image file (PNG, JPG, or GIF).");
      }
    };

    const displayPreview = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
      };
    };

    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
    fileInput.addEventListener("change", handleFileChange);

    return () => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("dragleave", handleDragLeave);
      dropzone.removeEventListener("drop", handleDrop);
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=ee909033f338b65f995ac2f0b70180f4`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const uploadedUrl = response.data.data.url;

      const shortenedUrl = await shortenUrl(uploadedUrl);

      setPreviewSrc(shortenedUrl);
      return shortenedUrl;
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed.");
      return null;
    }
  };

  const shortenUrl = async (longUrl: string) => {
    try {
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        { long_url: longUrl },
        {
          headers: {
            Authorization: `Bearer <YourActualBitlyToken>`,
          },
        }
      );
      console.log("Shortened URL response:", response.data);
      return response.data.link;
    } catch {
      return longUrl;
    }
  };

  const {data} = useSession()

  const handleSave = async (e) => {
    e.preventDefault()
    console.log(previewSrc, "previewSrc")
    const Edit = await axios.patch(`http://localhost:3000/api/user/${data?.user?.email}`, {user_photo: previewSrc} )
    console.log(Edit, "Edit")
  }


  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="mx-auto p-8 mt-20 w-[420px] text-center">
      <div className="flex justify-between">
        <div
          ref={dropzoneRef}
          className="relative border-2 border-gray-300 border-dashed rounded-lg p-6"
        >
          <input
            ref={fileInputRef}
            type="file"
            required
            className="absolute inset-0 w-full h-full opacity-0 z-50"
            accept="image/png, image/jpeg, image/gif"
          />
          <div className="text-center">
            <Image
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
              alt="Upload icon"
              width={500}
              height={500}
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Update photo</span>
                <span className="text-indigo-600"> or browse</span>
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <div className="border-2 h-48 overflow-hidden border-gray-300 border-dashed rounded-lg w-48 flex items-center justify-center p-2 ml-2">
          {previewSrc && (
            <Image
              src={previewSrc}
              alt="Preview"
              width={600}
              height={600}
              className="mx-auto "
            />
          )}
        </div>
      </div>
     <div className="flex mt-4 justify-between">
     <div></div>
     <div className="flex gap-x-3">
     <Link href="/login" className="w-full cursor-pointer bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition px-4">Skip</Link>
     <button onClick={handleSave} className="w-full cursor-pointer bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition px-4">Save</button>
     </div>
     </div>
    </div>
    </div>
  );
}

export default UserPhoto;
