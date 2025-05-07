import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-blue-600">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-solid"></div>
    </div>
  );
};

export default LoadingSpinner;
