import React from "react";

const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center mt-3" : "text-start mt-3"}>
      <div className="text-2xl font-bold ">{title}</div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
