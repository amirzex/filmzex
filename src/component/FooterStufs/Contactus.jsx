import React from "react";

const Contactus = () => {
  return (
    <div className=" flex flex-col gap-35 pt-10 ">
      <div className="flex flex-row justify-center">
        <div className="border-t-3 border-red-400 w-4/10"></div>
        <div className="flex flex-row text-center justify-center text-3xl font-sans w-1/10 relative">
          <p className="absolute top-[-25px]">contactus</p>
        </div>
        <div className="border-t-3 border-red-400 w-4/10"></div>
      </div>

      <div className="flex flex-col text-2xl text-center  scale-90 bg-gray-500/40 backdrop-blur-md p-10">
        To support the user panel, create a ticket. Requesting movies and series
        through support is prohibited and will not be considered if submitted.
      </div>
    </div>
  );
};

export default Contactus;
