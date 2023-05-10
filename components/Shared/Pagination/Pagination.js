import React, { useState } from "react";
import {} from "react-icons/md";

const Pagination = ({ setSort, sort, pageFound, data }) => {
  let totalPageFound = pageFound ? pageFound : data?.pageFound;
  const [selected, setSelected] = useState(1);
  const array = [];
  for (let index = 0; index < totalPageFound; index++) {
    array.push(index);
  }
  const handleClick = (arr) => {
    setSort({ ...sort, pageNumber: Number(arr) });
    setSelected(arr);
  };

  return (
    <div className="d-flex justify-content-center ">
      {array.length > 1 &&
        array.map((arr) => (
          <button
            key={arr}
            className={`btn btn-sm mx-2 border ${
              selected === arr + 1 && "bg-warning text-white  border-none "
            }`}
            onClick={() => handleClick(arr + 1)}
          >
            {arr + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
