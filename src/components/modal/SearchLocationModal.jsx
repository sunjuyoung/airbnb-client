import qs from "query-string";
import { useCallback, useMemo, useState } from "react";

import Modal from "./Modal";
import CountrySelect from "../inputs/CountrySelect";
import Heading from "../Heading";
import Map from "../../components/Map";
import useSearchModal from "../../hooks/useSearchModal";
import {
  useNavigate,
  useParams,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import newRequest from "../../utils/newRequest";

const SearchLocationModal = () => {
  const searchModal = useSearchModal();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let categoryParam = searchParams.get("category");

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (categoryParam) {
      currentQuery = { category: categoryParam };
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.label,
    };

    // console.log(updatedQuery);
    const url = qs.stringifyUrl(
      {
        url: "",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    // console.log(url);

    searchModal.onClose();
    navigate(url);
  }, [searchModal, location, params]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Location Filter" subtitle="Find the location!" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
      actionLabel={"찾기"}
    />
  );
};

export default SearchLocationModal;
