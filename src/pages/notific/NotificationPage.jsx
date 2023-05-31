import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { getNotification } from "../../utils/newRequest";
import Heading from "../../components/Heading";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

const NotificationPage = () => {
  const token = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: notification,
    error,
  } = useQuery(
    ["notification"],
    async () => await getNotification(user?.id, token),
    {
      enabled: user !== null,
    }
  );

  const mutationNotification = useMutation({
    mutationFn: (listing) => {
      return newRequest.post("/listing", listing, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
      toast.success("Listing save sucess");
      navigate("/");
    },
  });
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading..</span>;
  }
  if (notification?.length === 0 || !notification) {
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

  const notificationCheck = (e, id) => {
    e.preventDefault();

    mutationNotification.mutate({ id });
  };

  console.log(notification);

  return (
    <div className="w-auto h-full mx-auto gap-7 lg:w-5/6">
      <div className="flex items-center justify-center h-20 py-5 my-10">
        <p className="text-4xl font-bold">알림</p>
      </div>
      <div className="flex flex-col gap-5">
        {notification?.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-around py-10 mx-10 text-center border cursor-pointer "
          >
            <Avatar />
            <div className="text-lg font-bold ">
              {n.sendUser} 님께서 {n.title}공간을 {n.message}
            </div>

            <div className="items-center justify-center">
              <button
                onClick={(e) => notificationCheck(e, n.id)}
                className="text-lg hover:font-bold hover:text-xl"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
