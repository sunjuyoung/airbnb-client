import React, { useState } from "react";

const CategoryBox = ({ Icon, label, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        items-center
        p-4
        flex
        flex-col
        gap-2
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default React.memo(CategoryBox);
