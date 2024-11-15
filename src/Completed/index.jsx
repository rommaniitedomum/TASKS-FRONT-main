import React from "react";
import Navbar from "../components/Navbar";
import Itempanel from "./../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navbar menuIdx={1} />
      <Itempanel pageTitle="Completed Items" filterCompleted={true} />
    </div>
  );
};

export default index;
