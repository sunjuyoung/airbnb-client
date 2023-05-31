import qs from "query-string";
import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const CategoryBox = ({ Icon, label, selected }) => {
  const navigate = useNavigate();

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let locationParams = searchParams.get("locationValue");

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (locationParams) {
      currentQuery = { locationValue: locationParams };
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    //두번 클릭시 제거
    if (searchParams.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // console.log(url);
    navigate(url);
  }, [label, params, Icon]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
