import React from "react";
import { getListingsListByUserId } from "../../utils/newRequest";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Heading";
import ListingCard from "../../components/listing/listingCard";

const FavoritesPage = () => {
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);

  const {
    isLoading,
    isError,
    data: listings,
    error,
  } = useQuery(
    ["listings"],
    async () => await getListingsListByUserId(user.id, token)
  );

  if (isLoading || listings?.length === 0) {
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
        <Heading center title="No My Listing found" subtitle="..." />
        {/* <div className="w-48 mt-4">
          {showReset && (
            <Button outline label="Remove all filters" onClick={() => {}} />
          )}
        </div> */}
      </div>
    );
  }
  console.log(listings);

  return (
    <div
      className="max-w-[2520px] mx-auto
xl:px-20 md:px-10 px-4 sm:px-2"
    >
      <Heading title="My Propertis" subtitle="..." />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.listing_id}
            data={listing}
            actionId={listing.user_id}
            //            onAction={onCancel}
            disabled={user.id === listing.user_id}
            currentUser={user}
            buttonLabel={"보기"}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
