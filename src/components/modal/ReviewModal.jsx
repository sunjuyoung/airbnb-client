import React from "react";
import Modal from "./Modal";
import useReview from "../../hooks/useReview";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import ReviewSelect from "../inputs/ReviewSelect";
import { useState } from "react";

const ReviewModal = () => {
  const reviewModal = useReview();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state?.token);
  const queryClient = useQueryClient();
  const param = useParams();
  const [rating, setRating] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      reviewContent: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (data) => {
      return newRequest.post("/review", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
      toast.success("리뷰작성");
      reset();
      reviewModal.onClose();
    },
  });

  const reviewContent = watch("reviewContent");
  //const rating = watch("rating");

  const onSubmit = async (data) => {
    reviewMutation.mutate({
      listing_id: param.id,
      comment: data.reviewContent,
      reviewer: user?.name,
      reviewer_id: user?.id,
      rating: rating,
    });
  };

  let title = (
    <div className="flex flex-col justify-between ">
      <div>{user?.name}</div>
    </div>
  );

  let bodyContent = (
    <div className="flex flex-col w-full gap-8 mt-7">
      <div className="flex items-center w-4/6">
        <label>점수:</label>
        <ReviewSelect setRating={setRating} />
      </div>

      <div className="relative w-full">
        <label
          className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-2 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          bg-white
          ${errors["reviewContent"] ? "text-rose-500" : "text-zinc-400"}
        `}
        >
          리뷰
        </label>
        <textarea
          id="reviewContent"
          {...register("reviewContent", { required: true })}
          placeholder=" "
          rows={3}
          className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors["reviewContent"] ? "border-rose-500" : "border-neutral-300"}
          ${
            errors["reviewContent"]
              ? "focus:border-rose-500"
              : "focus:border-black"
          }
        `}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={reviewModal.isOpen}
      title={title}
      actionLabel={"리뷰작성"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={reviewModal.onClose}
      body={bodyContent}
    />
  );
};

export default ReviewModal;
