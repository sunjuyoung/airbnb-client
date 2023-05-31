import React from "react";
import Logo from "./Logo";
import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import Categories from "./Categories";

const Navbar = () => {
  const user = useSelector((state) => state?.user);

  return (
    <div className="z-10 w-full mb-4 bg-white shadow-sm ">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
      {/* <Categories /> */}
    </div>
  );
};

export default Navbar;
