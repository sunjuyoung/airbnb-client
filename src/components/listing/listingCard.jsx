import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";

import Button from "../Button";
import { Navigate, useNavigate } from "react-router-dom";
import HeartButton from "../HeartButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ListingCard = ({ data, currentUser, reservation, buttonLabel }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [rating, setRating] = useState(0);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const listingDate = useMemo(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    return `${format(start, "MM월dd일")} ~ ${format(end, "MM월dd일")}`;
  }, [data]);

  const calculateAverage = () => {
    const sum = data.review.reduce((acc, curr) => acc + curr.rating, 0);
    const average = sum / data.review.length;
    return average.toFixed(1);
  };

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <img
            className="object-cover w-full h-full transition hover:scale-110"
            src={`${data.image_src}`}
            alt="Listing"
            onClick={() => navigate(`/listing/${data.listing_id}`)}
          />
          {parseInt(user?.id) !== data.user_id ? (
            <div className="absolute top-5 right-5">
              <HeartButton listingId={data.listing_id} currentUser={user} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap w-44">
            {data.location}
          </span>
          <div className="flex items-center">
            <span className="mr-2 font-thin">
              <FaStar />
            </span>
            <span>{data.review.length > 2 ? calculateAverage() : "-"}</span>
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listingDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {data.totalPrice || data.price} 원
          </div>
          <div className="font-light">/박</div>
        </div>

        {/* <Button label={buttonLabel} /> */}
      </div>
    </div>
  );
};

export default ListingCard;
