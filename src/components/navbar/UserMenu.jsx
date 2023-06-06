import React, { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import { toast } from "react-hot-toast";
import { IoFastFood } from "react-icons/io5";
import { useQueries, useQuery } from "@tanstack/react-query";
import newRequest, { getNotificationCount } from "../../utils/newRequest";

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state?.token);

  const {
    isLoading,
    isError,
    data: notificationCount,
    error,
  } = useQuery(
    ["notification", user?.id],
    async () => await getNotificationCount(user?.id, token),
    {
      enabled: user?.id !== null,
    }
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const userMenuToggle = useCallback((path) => {
    setIsOpen(() => false);
    navigate(path);
  }, []);

  const logoutHandle = () => {
    dispatch(setLogout());
    toast.error("Logout");
    navigate("/");
  };
  const onListingForm = useCallback(() => {
    if (!user) {
      navigate("/login");
    }
    setIsOpen(() => false);
    navigate("/listingForm");
  }, []);

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }
  // if (isLoading) {
  //   return <span>Loading..</span>;
  // }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onListingForm}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          당신의 공간을 에어비앤비하세요
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {user && token ? (
              <div className="absolute top-0 right-0 items-center justify-center w-5 h-5 text-white rounded-full bg-rose-500">
                <span className="absolute top-0.5 items-center justify-center text-xs right-2">
                  {notificationCount}
                </span>
              </div>
            ) : (
              <></>
            )}

            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            z-10
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem
                  label="알림"
                  onClick={() => {
                    userMenuToggle("/notification");
                    //navigate("/trips");
                  }}
                />
                <MenuItem
                  label="여행"
                  onClick={() => {
                    userMenuToggle("/trips");
                  }}
                />
                <MenuItem
                  label="위시리스트"
                  onClick={() => {
                    userMenuToggle("/favorites");
                  }}
                />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem
                  label="계정"
                  onClick={() => {
                    userMenuToggle("/profile");
                  }}
                />

                <hr />
                <MenuItem label="Logout" onClick={() => logoutHandle()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => navigate("/login")} />
                <MenuItem
                  label="Sign up"
                  onClick={() => navigate("/register")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
