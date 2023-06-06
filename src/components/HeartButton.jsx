import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useFavorites } from "../utils/newRequest";
import { toast } from "react-hot-toast";
import { addFavorite, deleteFavorite } from "../state";
import { useEffect } from "react";

const HeartButton = ({ listingId, currentUser }) => {
  const favorites = useSelector((state) => state.favorites);
  const token = useSelector((state) => state.token);
  const hasFavorited = favorites?.includes(listingId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //useEffect(() => {}, [favorites]);

  const mutation = useMutation({
    mutationFn: (data) => {
      return useFavorites(data, token, hasFavorited);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorite"]);
      if (hasFavorited) {
        dispatch(deleteFavorite({ listingId }));
      } else {
        dispatch(addFavorite({ listingId }));
      }
      toast.success("favorite add sucess");
    },
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    mutation.mutate({
      listing_id: parseInt(listingId),
      email: currentUser.email,
      userId: parseInt(currentUser.id),
    });
  };

  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
