import React, { useState } from "react";
import {} from "react-icons/md";

const Pagination = ({ setPageNumber, pageFound }) => {
  const [selected, setSelected] = useState(1);
  const array = [];
  for (let index = 0; index < pageFound; index++) {
    array.push(index);
  }
  const handleClick = (arr) => {
    setPageNumber(Number(arr));
    setSelected(arr);
  };
  return (
    <div className="d-flex justify-content-center ">
      {array.map((arr) => (
        <button
          key={arr}
          className={`btn btn-sm mx-2 ${
            selected === arr + 1 && "bg-primary text-white  border-none "
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
