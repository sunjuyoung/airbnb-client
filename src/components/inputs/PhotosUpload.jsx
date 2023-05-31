import React, { useState } from "react";

const PhotosUpload = ({ onChange }) => {
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    //setPhotos([...photos, event.target.files[0]]);
    onChange(event.target.files[0]);
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setImagePreview(() => [...imagePreview, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (e, link) => {
    e.preventDefault();

    setImagePreview([...imagePreview.filter((photo) => photo !== link)]);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-2 md:grid-cols-4 lg:grid-cols-6">
        {imagePreview?.length > 0 &&
          imagePreview.map((link) => (
            <div className="relative flex h-32" key={link}>
              <img
                className="object-cover w-full rounded-2xl"
                src={link}
                alt=""
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute px-3 py-2 text-white bg-black bg-opacity-50 cursor-pointer bottom-1 right-1 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        <label className="flex items-center justify-center h-32 gap-1 p-2 text-2xl text-gray-600 bg-transparent border cursor-pointer rounded-2xl">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUpload;
