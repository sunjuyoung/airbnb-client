import { useNavigate, useParams } from "react-router-dom";
import { addReservation, getListingById } from "../../utils/newRequest";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "../../components/Heading";
import ListingInfo from "../../components/listing/ListingInfo";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useMemo } from "react";
import ListingReservation from "../../components/listing/ListingReservation";
import { useCallback } from "react";
import { useEffect } from "react";
import HeartButton from "../../components/HeartButton";
import Avatar from "../../components/Avatar";
import ListingReview from "../../components/listing/ListingReview";

const ListingPage = () => {
  const param = useParams();
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const listing_id = parseInt(param.id);
  const [totalPrice, setTotalPrice] = useState(1000);
  const reservations = [];
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const {
    isLoading,
    isError,
    data: listing,
    error,
  } = useQuery(
    ["listing"],
    async () => await getListingById(listing_id, token)
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
    setDisabled(parseInt(user?.id) === listing?.userId);
  }, [dateRange, listing]);

  //create reservation
  const mutatioReservation = useMutation({
    mutationFn: (data) => {
      return addReservation(data, token);
    },
    onSuccess: () => {
      //queryClient.invalidateQueries(["reservations"]);
      toast.success("Reservation sucess");
    },
  });

  const onCreateReservation = () => {
    mutatioReservation.mutate({
      listing_id: listing_id,
      user_id: user.id,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      totalPrice: totalPrice,
    });
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading..</span>;
  }
  const disabledDates = () => {
    let dates = [];

    listing.reservationDates?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  };

  return (
    <div
      className="max-w-[2520px] mx-auto
xl:px-20 md:px-10 px-4 sm:px-2"
    >
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <Heading title={listing.title} subtitle={`${listing.location}`} />
          <div
            className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
          >
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
              <img
                src={`/images/listing/${listing.imageSrc[0]}`}
                className="relative object-cover w-screen aspect-square"
                alt="Image"
              />
              <div className="grid">
                <img
                  src={`/images/listing/${listing.imageSrc[1]}`}
                  className="relative object-cover w-screen aspect-square"
                  alt="Image"
                />
                <div className="overflow-hidden">
                  <img
                    src={`/images/listing/${listing.imageSrc[2]}`}
                    className="relative object-cover w-screen cursor-pointer aspect-square top-2"
                    alt="Image"
                  />
                </div>
              </div>
            </div>

            {!disabled ? (
              <div className="absolute top-5 right-5">
                <HeartButton listingId={listing.id} currentUser={user} />
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              username={listing.name}
              userImage={null}
              category={listing.category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              location={listing.location}
              latlng={listing.latlng}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: value.startDate,
                    endDate: value.endDate,
                  }))
                }
                dateRange={dateRange}
                startDate={listing.startDate}
                endDate={listing.endDate}
                onSubmit={onCreateReservation}
                disabled={disabled}
                disabledDates={disabledDates()}
              />
            </div>
          </div>
          <hr />
          {/* 리뷰 댓글 */}
          <ListingReview
            listingId={listing_id}
            currentUser={user}
            disabled={disabled}
          />

          <hr />

          {/* bottom */}
          <div>
            <p className="text-2xl font-bold">알아두어야할 사항</p>
            <div className="flex flex-row row-span-3 justify-evenly">
              <div>
                <p>숙소 이용규칙</p>
              </div>
              <div>안전 및 숙소</div>
              <div>환불 정책</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
