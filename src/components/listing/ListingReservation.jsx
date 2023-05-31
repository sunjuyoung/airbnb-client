import Button from "../Button";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  startDate,
  endDate,
}) => {
  const handleChange = (ranges) => {
    onChangeDate(ranges.selection);
  };

  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="flex flex-row items-center gap-1 p-4 ">
        <div className="text-2xl font-semibold">$ {price} </div>
        <div className="text-lg font-light text-neutral-600"> /박</div>
      </div>
      <hr />

      <DateRange
        rangeColors={["#262626"]}
        ranges={[dateRange]}
        date={new Date()}
        onChange={handleChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date(startDate)}
        maxDate={new Date(endDate)}
        disabledDates={disabledDates}
      />

      <hr />
      <div className="p-4">
        <Button label="예약" onClick={onSubmit} disabled={disabled} />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold ">
        <div>총 합계:</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
