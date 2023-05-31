import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="hidden cursor-pointer md:block"
        src="/images/logo.png"
        height="100"
        width="100"
        alt="Logo"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Logo;
