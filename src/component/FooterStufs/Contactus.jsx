import React from "react";

const Contactus = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pt-8 px-4 md:px-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-center gap-4 pt-6">
        <div className="h-px flex-1 bg-red-400"></div>
        <p className="text-2xl md:text-3xl font-sans whitespace-nowrap">
          contactus
        </p>
        <div className="h-px flex-1 bg-red-400"></div>
      </div>

      <div className="flex flex-col text-base md:text-2xl text-center bg-gray-500/40 backdrop-blur-md p-6 md:p-10 rounded-xl">
        To support the user panel, create a ticket. Requesting movies and series
        through support is prohibited and will not be considered if submitted.
      </div>
    </div>
  );
};

export default Contactus;
