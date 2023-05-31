import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { formatISO } from "date-fns";
import Modal from "./Modal";
import Heading from "../Heading";
import useDateSearchModal from "../../hooks/useDateSearchModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SearchDateModal = () => {
  const searchModal = useDateSearchModal();
  const navigate = useNavigate();
  const params = useSearchParams();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery = {
    ...currentQuery,
  };

  // if (dateRange.startDate) {
  //   updatedQuery.startDate = formatISO(dateRange.startDate);
  // }

  // if (dateRange.endDate) {
  //   updatedQuery.endDate = formatISO(dateRange.endDate);
  // }

  const handleChange = (ranges) => {
    setDateRange((prev) => ({
      ...prev,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    }));
  };

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    const startD = formatISO(dateRange.startDate, { representation: "date" });
    const endD = formatISO(dateRange.endDate, { representation: "date" });

    const updatedQuery = {
      ...currentQuery,
      startDate: startD,
      endDate: endD,
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
  }, [searchModal, params]);

  let bodyContent = (
    <div className="flex flex-col items-center gap-8">
      <Heading title="날짜 선택" subtitle="..." />

      <DateRange
        rangeColors={["#262626"]}
        ranges={[dateRange]}
        date={new Date()}
        onChange={handleChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        // disabledDates={disabledDates}
      />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={"찾기"}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchDateModal;
