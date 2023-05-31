import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";

const EmptyState = ({
  title = "일치하는 항목이 없습니다",
  subtitle = "Try changing or removing some of your filters.",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        <Button outline label="필터 초기화" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default EmptyState;
