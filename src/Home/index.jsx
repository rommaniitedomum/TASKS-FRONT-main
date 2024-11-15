import React from "react";
import Navbar from "../components/Navbar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navbar menuIdx={0} />
      <Itempanel pageTitle="All Items" filterCompleted="all" />
    </div>
  );
};

export default index;
