import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  // withCredentials: true,
});

export const getAllListing = async (token, url, pageParam) => {
  const response = await newRequest.get(`/listing?page=${pageParam}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getListingById = async (id, token) => {
  const response = await newRequest.get(`/listing/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useFavorites = async (data, token, hasFavorited) => {
  let res;
  if (hasFavorited) {
    console.log("addddddddd");
    res = await newRequest.delete(
      `/favorite/${data.listing_id}/${data.userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } else {
    console.log("delete");
    res = await newRequest.post("/favorite", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return res.data;
};

export const addReservation = async (data, token) => {
  const response = await newRequest.post(`/reservation`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getReservationByUser = async (id, token) => {
  const response = await newRequest.get(`/reservation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getFavoriteListingListByUserId = async (id, token) => {
  const response = await newRequest.get(`/favorite/listingList/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getListingsListByUserId = async (id, token) => {
  const response = await newRequest.get(`/listing/list/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getReviewsByListingId = async (id, page, token) => {
  const response = await newRequest.get(`/review/${id}?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getNotification = async (id, token) => {
  const response = await newRequest.get(`/notification/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getNotificationCount = async (id, token) => {
  const response = await newRequest.get(`/notification/count/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default newRequest;
