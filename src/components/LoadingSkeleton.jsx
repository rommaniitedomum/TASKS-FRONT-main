import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="flex lg:w-1/3 md:w-1/2 w-full flex-col p-4 justify-between">
      <div>
        <Skeleton width="40%" height="30px" />
      </div>
      <div>
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
        <Skeleton width="100%" height="30px" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
