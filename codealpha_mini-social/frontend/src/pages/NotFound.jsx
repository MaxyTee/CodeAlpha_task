import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center h-[50%] gap-7">
        <p className="text-3xl">404 Page</p>
        <button
          onClick={() => navigate("/dashboard/overview")}
          className="p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
