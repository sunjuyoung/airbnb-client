import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";

const EmptyReview = ({
  title = "후기가 없습니다",
  subtitle = "Please write a review.",
  disabledButton,
}) => {
  return (
    <div
      className="
        h-[10vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
        mb-10
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {!disabledButton ? (
          <Button outline label="후기 남기기" onClick={() => navigate("/")} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EmptyReview;
