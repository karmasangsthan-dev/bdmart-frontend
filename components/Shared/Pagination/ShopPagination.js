import { PaginationItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import {} from "react-icons/md";

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
  console.log({ pageFound });
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);

    setSort({ ...sort, pageNumber: Number(value) });
  };

  return (
    <div className="d-flex justify-content-center ">
      <Stack>
        {/* <Typography sx={{ textAlign: "center" }}>Page: {page}</Typography> */}
        <Pagination count={pageFound} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default ShopPagination;
