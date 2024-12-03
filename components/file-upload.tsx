"use client";
import { useState } from "react";
import * as Images from "@/public/images";

export const FileUpload = ({
  photos,
  setPhotos,
}: {
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const [fileEnter, setFileEnter] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setPhotos((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setPhotos((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setFileEnter(false);
  };

  const handleDelete = (index: number) => {
    setPhotos((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const handleReset = () => {
    setPhotos([]);
  };

  return (
    <div className="w-full mx-auto flex flex-col">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${
          fileEnter ? "border-4" : "border-2"
        } mx-auto bg-white flex flex-col w-full h-72 border-dashed items-center justify-center`}>
        <label
          htmlFor="file"
          className="h-full w-[200px] flex flex-col justify-center text-center items-center gap-[15px]">
          <Images.upload />
          <span className="text-[14px] font-normal text-[#252525]">
            <span className="text-[#1AA683]">Нажмите</span>, чтобы загрузить,
            или перетащите.
          </span>
          <span className="text-[14px] font-normal text-[#B5B7C0]">
            Минимум количество 5
          </span>
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Display uploaded images below drag-and-drop area */}
      {photos.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4 mt-4">
            {photos.map((file, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <img
                  className="rounded-md w-full max-w-xs h-48 object-cover"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded-full hover:bg-red-600">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
