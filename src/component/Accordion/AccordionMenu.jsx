import React, { useState } from "react";

const AccordionItem = ({
  title,
  items,
  isOpen,
  onToggle,
  id,
  selectedFilters,
  onSelect,
}) => (
  <div className="border-white w-64">
    <button
      className="w-full flex justify-between items-center p-4 focus:outline-none hover:bg-gray-700 transition"
      onClick={() => onToggle(id)}
    >
      <span className="font-semibold text-xl">{title}</span>
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen
          ? "max-h-[500px] overflow-scroll opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      <ul className="p-4 space-y-2 bg-gray-800">
        {items.map((item, index) => {
          const isSelected = selectedFilters[id]?.includes(item);
          return (
            <li
              key={index}
              className={`p-2 rounded cursor-pointer transition ${
                isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-700"
              }`}
              onClick={() => onSelect(id, item)}
            >
              {id === "ratings"
                ? `Rating: ${item}`
                : id === "years"
                ? `Year: ${item}`
                : id === "genres"
                ? `Genre: ${item}`
                : id === "sortby"
                ? `ID: ${item}`
                : item}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

const AccordionMenu = ({ ratingsData, onFiltersChange }) => {
  const [openId, setOpenId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleAccordion = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };
  const handleSelect = (category, item) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(item);

      const updated = isSelected
        ? current.filter((i) => i !== item)
        : [...current, item];

      const newFilters = { ...prev, [category]: updated };

      // Optional callback to notify parent
      if (onFiltersChange) {
        onFiltersChange(newFilters);
      }

      return newFilters;
    });
  };

  const uniqueRatings = Array.from(
    new Set(ratingsData.map((item) => item.rating))
  );
  const uniqueYears = Array.from(
    new Set(ratingsData.map((item) => item.release_year))
  );
  const uniquegenre = Array.from(
    new Set(ratingsData.map((item) => item.genre))
  );
  const uniqueid = Array.from(new Set(ratingsData.map((item) => item.id)));

  const ratingItems = uniqueRatings.sort(); // ["PG", "R", ...]
  const yearItems = uniqueYears.sort(); // ["2020", "2021", ...]
  const genresItems = uniquegenre.sort(); // ["Action", "Drama", ...]
  const idItems = uniqueid.sort(); // ["123", "456", ...]

  const staticSections = [
    {
      id: "sortby",
      title: "Sort by",
      items: idItems,
    },
    {
      id: "genres",
      title: "Genres",
      items: genresItems,
    },
  ];

  const sections = [
    ...staticSections,
    {
      id: "ratings",
      title: "Ratings",
      items: ratingItems,
    },
    {
      id: "years",
      title: "Years",
      items: yearItems,
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          items={items}
          isOpen={openId === id}
          onToggle={toggleAccordion}
          selectedFilters={selectedFilters}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default AccordionMenu;
