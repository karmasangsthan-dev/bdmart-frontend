import { PaginationItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Pagination from '@mui/material/Pagination';
import { } from "react-icons/md";

const ShopPagination = ({ setSort, sort, pageFound, data }) => {
  // let totalPageFound = pageFound ? pageFound : data?.pageFound;
  // const [selected, setSelected] = useState(1);
  // const array = [];
  // for (let index = 0; index < totalPageFound; index++) {
  //   array.push(index);
  // }
  // const handleClick = (arr) => {
  //   setSort({ ...sort, pageNumber: Number(arr) });
  //   setSelected(arr);
  // };

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };


  return (
    <div className="d-flex justify-content-center ">
      {/* {array.length > 1 &&
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
        ))} */}
      <Stack >
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default ShopPagination;
