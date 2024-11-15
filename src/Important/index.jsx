import React from "react";
import Navbar from "../components/Navbar";
import Itempanel from "../components/Itempanel";

const index = () => {
  return (
    <div className="page-section">
      <Navbar menuIdx={3} />
      <Itempanel
        pageTitle="Important Items"
        filterCompleted="all"
        filterImportant={true}
      />
    </div>
  );
};

export default index;
