import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryInput from "../../components/inputs/CategoryInput";
import { categories } from "../../components/navbar/Categories";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import CountrySelect from "../../components/inputs/CountrySelect";
import { useMemo } from "react";
import { useCallback } from "react";
import Input from "../../components/inputs/Input";
import { useEffect } from "react";
import Map from "../../components/Map";
import Counter from "../../components/inputs/Counter";
import ImageUpload from "../../components/inputs/ImageUpload";
import Button from "../../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest, { saveListingImage } from "../../utils/newRequest";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PhotosUpload from "../../components/inputs/PhotosUpload";

const ListingForm = () => {
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: [],
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      title: "",
      description: "",
    },
  });

  //const dateChekc = dateRange.endDate.getTime() === new Date().getTime() && image.length > 1;
  const checkButton = image.length > 2;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [dateRange]);

  const mutation = useMutation({
    mutationFn: (listing) => {
      return newRequest.post("/listing", listing, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["listings"]);
      toast.success("Listing save sucess");
      navigate("/");
    },
  });

  const saveImage = async () => {
    const files = new FormData();
    if (image === null) return;
    for (let i = 0; i < image.length; i++) {
      files.append("files", image[i]);
    }

    return await saveListingImage(user?.id, token, files);
  };

  const listingSubmit = async (data) => {
    const result = await saveImage();

    mutation.mutate({
      ...data,
      location: location.label,
      email: user.email,
      images: result,
      latlng: JSON.stringify(location.latlng),
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  };

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  //const imageSrc = watch("imageSrc");

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(event.target.files[0]);
  //   if (!file) {
  //     setImagePreview(null);
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //     console.log(reader.result);
  //     // onChange(file);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleCategories = (ca, item) => {
    //      두번 클릭시 제거
    if (category.includes(ca)) {
      const editCategory = category.filter((c) => c !== ca);
      setCustomValue("category", editCategory);
    } else {
      category.length > 3
        ? toast.error("카테고리 설정 초과.")
        : setCustomValue("category", [...category, ca]);
    }
  };

  const handleChange = (ranges) => {
    setDateRange((prev) => ({
      ...prev,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    }));
  };

  const handleImageCheck = (value) => {
    if (image.length < 6) {
      setImage(() => [...image, value]);
    } else {
      toast.error("사진 저장 최대 갯수는 6개 이하입니다.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full mx-auto my-6 lg:w-4/6 xl:w-3/5 md:h-auto">
        {/* category */}

        <Heading title="카테고리" subtitle="Pick a category" />
        <div
          className="
        grid 
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-5 
        gap-3
        max-h-[30vh]
        lg:grid-cols-5
        overflow-y-auto
        overflow-x-auto
   
        
      "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(ca) => handleCategories(ca, item.icon)}
                selected={category?.includes(item.label)}
                label={item.label}
                Icon={item.icon}
              />
            </div>
          ))}
        </div>

        {/* Map */}

        <div className="flex flex-col gap-8 mt-4">
          <Heading title="위치" subtitle="Help guests find you!" />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />

          <Map center={location?.latlng} />
        </div>
        {/* 기본옵션 */}
        <hr />
        <div className="flex flex-col gap-8 mt-6">
          <Heading title="기본 옵션" subtitle="What amenitis do you have?" />
          <Counter
            onChange={(value) => setCustomValue("guestCount", value)}
            value={guestCount}
            title="총인원"
            subtitle="How many guests do you allow?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue("roomCount", value)}
            value={roomCount}
            title="방 개수"
            subtitle="How many rooms do you have?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue("bathroomCount", value)}
            value={bathroomCount}
            title="욕실"
            subtitle="How many bathrooms do you have?"
          />
        </div>
        {/* 사진 */}
        <div className="flex flex-col gap-8 mt-6">
          <hr />
          <Heading
            title="사진"
            subtitle="정확한 정보를 위해 최소 3장 최대 6장의 사진을 등록해 주세요 (5MB이하)"
          />

          <PhotosUpload onChange={(value) => handleImageCheck(value)} />
        </div>
        {/* 타이틀 */}
        <div className="flex flex-col gap-8 mt-7">
          <Heading title="설명" subtitle="Short and sweet works best!" />
          <Input
            id="title"
            label="Title"
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            register={register}
            errors={errors}
            required
          />
        </div>
        {/* 가격 */}
        <div className="flex flex-col col-span-2 gap-8 ">
          <Heading title="가격" subtitle="How much do you charge per night?" />
          <div className="grid grid-cols-3 ">
            <Input
              id="price"
              label="Price"
              formatPrice
              type="number"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-4 ">
          <Heading title="날짜" subtitle=" " />
          <div>
            <DateRange
              rangeColors={["#262626"]}
              ranges={[dateRange]}
              date={new Date()}
              onChange={handleChange}
              direction="vertical"
              showDateDisplay={false}
              minDate={new Date()}
              // disabledDates={disabledDates}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-row items-center w-full gap-4 ">
            <Button
              disabled={!checkButton}
              label={"저장"}
              onClick={handleSubmit(listingSubmit)}
              outline
            />

            <Button label={"취소"} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
