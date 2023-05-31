import React from "react";
import { getReservationByUser } from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import ListingCard from "../../components/listing/listingCard";

const TripPage = () => {
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);

  const {
    isLoading,
    isError,
    data: reservations,
    error,
  } = useQuery(
    ["reservations"],
    async () => await getReservationByUser(user.id, token)
  );

  if (isLoading || reservations?.length === 0) {
    return (
      <div
        className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
      >
        <Heading
          center
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
        {/* <div className="w-48 mt-4">
          {showReset && (
            <Button outline label="Remove all filters" onClick={() => {}} />
          )}
        </div> */}
      </div>
    );
  }

  return (
    <div
      className="max-w-[2520px] mx-auto
xl:px-20 md:px-10 px-4 sm:px-2"
    >
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.reservation_id}
            data={reservation}
            reservation={reservation}
            actionId={reservation.user_id}
            //            onAction={onCancel}
            disabled={user.id === reservation.user_id}
            currentUser={user}
            buttonLabel={"예약 취소"}
          />
        ))}
      </div>
    </div>
  );
};

export default TripPage;
