import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByListingId } from "../../utils/newRequest";
import { useSelector } from "react-redux";
import EmptyState from "../EmptyState";
import EmptyReview from "../EmptyReview";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import useReview from "../../hooks/useReview";
import { useMemo } from "react";

const ListingReview = ({ listingId, currentUser, disabled }) => {
  const token = useSelector((state) => state?.token);
  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    data: reviews,
    error,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["review", page],
    async () => await getReviewsByListingId(listingId, page, token),
    {
      keepPreviousData: true,
    }
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading..</span>;
  }

  if (isFetching) {
    return <span>Loading..</span>;
  }
  if (!reviews || reviews.content.length === 0) {
    return (
      <>
        <EmptyReview disabledButton={disabled} />
      </>
    );
  }
  const nextPage = (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };
  const prevPage = (e) => {
    e.preventDefault();
    setPage((prev) => prev - 1);
  };
  // const pageArray = Array(reviews.totalPages)
  //   .fill()
  //   .map((_, index) => index + 1);

  const handlePage = () => {
    return Array(reviews.totalPages)
      .fill()
      .map((_, index) => index + 1);
  };

  const content = () => {
    return (
      <div className="items-center justify-center mx-auto">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                onClick={prevPage}
                href="#"
                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 
            rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
             dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
             ${isPreviousData || page === 1 ? "pointer-events-none" : ""}`}
              >
                Previous
              </a>
            </li>

            {handlePage.map((pg) => (
              <li key={pg}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pg);
                  }}
                  href="#"
                  className={`px-3 py-2 leading-tight  border border-gray-300
               hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                ${page === pg ? "bg-gray-800 text-white " : "text-gray-500"}
                `}
                >
                  {pg}
                </a>
              </li>
            ))}

            <li>
              <a
                onClick={nextPage}
                href="#"
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg
             hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 
             dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
             ${
               isPreviousData || page === reviews.totalPages
                 ? "pointer-events-none"
                 : ""
             }`}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  // const handleStar = useCallback(
  //   (index) => {
  //     const stars = [];
  //     for (let j = 0; j < index; j++) {
  //       stars.push(<FaStar key={j} />);
  //     }
  //     return stars;
  //   },
  //   [reviews]
  // );

  const body = () => {
    return reviews.content.map((review) => (
      <div key={review.id} className="flex flex-col h-auto gap-2">
        <div className="grid gap-2 grid-cols-[50px,2fr_1fr] items-center">
          <div className="w-10">
            <Avatar src={null} />
          </div>
          <div className="grid font-semibold">
            <div className="flex justify-between">
              <span>호스트 : {review.reviewer} </span>
              <span className="flex">{review.rating}</span>
            </div>
            <div className="font-thin">{review.updated_at}</div>
          </div>
        </div>
        <div>{review.comment}</div>
      </div>
    ));
  };

  return (
    <>
      <div className="pb-5 mb-2">
        <div className="flex items-center justify-between py-10 text-lg font-bold">
          <span>별점 후기 {reviews.content.length}개 </span>
          <span onClick={() => {}} className="cursor-pointer">
            후기 쓰기
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">{body}</div>
      </div>

      {/* 페이지 버튼 */}
      {content}
    </>
  );
};

export default ListingReview;
