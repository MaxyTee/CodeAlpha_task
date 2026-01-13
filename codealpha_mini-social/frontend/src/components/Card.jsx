import { User } from "lucide-react";
import React from "react";

const Card = () => {
  return (
    <div className="p-6 space-y-4 bg-white text-gray-900 rounded-lg shadow-lg">
      <div className="flex gap-4">
        <div className="p-2 text-black bg-pink-200 dropdown-shadow shadow-black/10 shadow-md">
          <User className="text-black" size={30} />
        </div>
        <div>
          <h2 className="font-semibold">Mariam Tairu</h2>
          <p>Cognitive Person | Enthusiastic scientist | Worked on 300.....</p>
        </div>
      </div>
      <div className="">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          deleniti et laborum totam praesentium natus repellendus minima
          doloremque asperiores dicta.
        </p>
      </div>
    </div>
  );
};

export default Card;
