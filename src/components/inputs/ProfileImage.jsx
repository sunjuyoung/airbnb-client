import React from "react";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

const ProfileImage = ({ username, imageButton, onChange, img }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleProfileImage = (e) => {
    e.preventDefault();
    const file = event.target.files[0];
    onChange(e.target.files[0]);
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-3/6 gap-4 border-solid shadow-xl rounded-xl sm:w-3/6 md:w-80 lg:w-80 h-72">
        <div className="relative z-2 top-1 ">
          <img
            className="rounded-full z-3 w-28 h-28"
            // height="100"
            // width="100"

            alt="Avatar"
            src={imagePreview == null ? img : imagePreview}
          />
        </div>

        {imageButton && (
          <div className="absolute z-4 top-[330px] flex items-center justify-center py-2 px-3 rounded-full shadow-xl cursor-pointer  shadow-slate-750 bg-white">
            <BiImageAdd />
            <div className="w-10 text-sm font-semibold z-5">
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImage}
                  className="hidden"
                />
                <span className="text-sm"> 추가</span>
              </label>
            </div>
          </div>
        )}

        <div className="relative flex flex-col items-center justify-center z-99 top-8">
          <div className="text-3xl font-bold">{username}</div>
          <div className="text-sm font-bold">게스트</div>
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
