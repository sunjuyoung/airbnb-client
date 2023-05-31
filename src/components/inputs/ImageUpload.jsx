import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

const ImageUpload = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result) => {
      onChange(result.target.files[0]);
      console.log(result.target.files[0]);
    },
    [onChange]
  );

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600">
      <TbPhotoPlus size={50} />
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleUpload}
      />
      {/* <div className="text-lg font-semibold">Click to upload</div> */}
      {value && (
        <div className="absolute inset-0 w-full h-full ">
          <img src={value} alt="House" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
