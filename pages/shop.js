import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Rating, Slider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button, Collapse } from "react-bootstrap";
import ShopProduct from "../components/Product/ShopProduct";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";
import {
  useGetAllProductsQuery,
  useGetProductsQuery,
} from "../features/product/productApi";
import Pagination from "../components/Shared/Pagination/Pagination";

// https://dummyjson.com/products
// export async function getServerSideProps() {
//   const res = await fetch(
//     ${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/bulk
//   );
//   const data = await res.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

const shop = () => {
  // const [pageNumber, setPageNumber] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [sort, setSort] = useState({
    perPage: 15,
    pageNumber: 1,
    priceSort: 0,
  });

  const [filter, setFilter] = useState({
    category: [],
    size: "",
    brand: [],
    price: [],
  });

  const { data, isLoading } = useGetAllProductsQuery(sort);
  const {
    data: products,
    isSuccess,
    isLoading: loading,
    isError,
    error,
  } = useGetProductsQuery({ sort, filter });

  useEffect(() => {
    if (
      sort.perPage !== 15 ||
      sort.priceSort ||
      sort.pageNumber !== 1 ||
      filter.category.length ||
      filter.brand.length ||
      filter.price.length
    ) {
      setAllProducts(products);
    } else if (
      sort.perPage === 15 ||
      !sort.priceSort ||
      sort.pageNumber === 1 ||
      !filter.category.length ||
      !filter.brand.length ||
      !filter.price.length
    ) {
      setAllProducts(data);
    }
  }, [
    products,
    data,
    sort.pageNumber,
    sort.perPage,
    sort.priceSort,
    filter.category,
    filter.brand,
    filter.price,
  ]);

  return (
    <Layout title="Shop - Bangladesh Mart">
      <div className="shop page-content">
        <div className="container">
          <div className="row ">
            <aside className="col-lg-2 order-lg-first">
              <ShopSideBar data={data} filter={filter} setFilter={setFilter} />
            </aside>
            <div className="col-lg-10 pl-lg-5">
              <div className="">
                <div className="widget w-100 widget-clean d-flex justify-content-between align-items-center">
                  <p className="fs-6">Total Products: {data?.total}</p>
                  <div className="d-flex gap-4">
                    <div className="d-flex py-1">
                      <span>Per page : </span>
                      <select
                        onChange={(e) =>
                          setSort({ ...sort, perPage: Number(e.target.value) })
                        }
                        className="ms-1 rounded px-2 border"
                      >
                        <option value={15}>15</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <div className="d-flex py-1">
                      <span>Sort by : </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            priceSort: Number(e.target.value),
                          })
                        }
                        className="ms-1 border rounded px-2 "
                      >
                        <option value={0}>Default</option>
                        <option value={-1}>Highest to lowest</option>
                        <option value={1}>Lowest to Highest</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="products">
                  <div className="shop-products">
                    {allProducts?.data?.map((product) => (
                      <ShopProduct product={product} key={product?._id} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-5">
                <Pagination
                  setSort={setSort}
                  sort={sort}
                  data={data}
                  pageFound={products?.pageFound}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default shop;