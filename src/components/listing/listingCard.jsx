import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import Button from "../Button";
import { Navigate, useNavigate } from "react-router-dom";
import HeartButton from "../HeartButton";
import { useSelector } from "react-redux";

const ListingCard = ({ data, currentUser, reservation, buttonLabel }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

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

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [data]);

  const avgListing = () => {
    let sum = 0;
    data?.reivew?.map((r) => {
      sum += r.rating;
    });
    return sum / data.reivew.length;
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
          <span>{data.location}</span>

          <span className="mr-2 font-thin">
            {data.review?.length > 2 ? avgListing : "-"}
          </span>
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
