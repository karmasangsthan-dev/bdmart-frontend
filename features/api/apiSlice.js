import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1`,
  }),
  tagTypes: [
    "User",
    "Seller",
    "Products",
    "Product",
    "Currency",
    "Review",
    "QuestionAndAnswer",
    "Categories",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
