import React from "react";

const PageTitle = ({ title }) => {
  return (
    <div className="page-title lg:text-2xl text-xl font-semibold py-2 mb-4 relative w-fit">
      {title}
      <span className="underbar absolute w-1/3 h-[2px] bg-gray-300 left-0 bottom-0"></span>
    </div>
  );
};

export default PageTitle;
