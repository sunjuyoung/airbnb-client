import Avatar from "../Avatar";
import { useMemo } from "react";
import { categories } from "../navbar/Categories";
import React from "react";
import Map from "../Map";

const ListingInfo = ({
  username,
  userImage,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  location,
  latlng,
}) => {
  //카테고리
  const cate = useMemo(() => {
    return categories.filter((item) => category?.includes(item.label));
    //return categories.find((items) => items.label === category);
  }, [category]);

  //지역
  const lat = latlng.split(",").map(Number);

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          <div>호스트 : {username}</div>
          <Avatar src={null} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />

      <div className="flex flex-row gap-6">
        {cate.map((c) => (
          <div key={c.label} className="flex gap-2">
            <div className="flex flex-row items-center gap-2">
              <c.icon size={40} className="text-neutral-600" />
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{c.label}</div>
                {/* <div className="font-light text-neutral-500">
                  {c.description}
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">
        <p className="mb-3 font-bold">숙소 정보</p>
        {description}
      </div>
      <hr />
      <Map center={lat} />
    </div>
  );
};

export default ListingInfo;
