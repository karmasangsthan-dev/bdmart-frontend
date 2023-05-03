import React, { useState } from "react";
import Layout from "../components/Layout";
import { Rating, Slider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button, Collapse } from "react-bootstrap";
import ShopProduct from "../components/Product/ShopProduct";
import ShopSideBar from "../components/Shop/ShopSideBar/ShopSideBar";

export async function getServerSideProps(context) {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const shop = ({ data }) => {
  const [sort, setSort] = useState({
    pageShort: 15,
    priceShort: "default",
  });
  const [filter, setFilter] = useState({
    category: "",
    size: "",
    brand: [],
    price: [0, 150],
  });
  return (
    <Layout>
      <div className="shop page-content">
        <div className="container">
          <div className="row ">
            <aside className="col-lg-2 order-lg-first">
              <ShopSideBar data={data} filter={filter} setFilter={setFilter} />
            </aside>
            <div className="col-lg-10 pl-lg-5">
              <div className="">
                <div className="widget w-100 widget-clean d-flex justify-content-between align-items-center">
                  <p className="fs-6">
                    Showing {data?.products?.length} of 4 Products
                  </p>
                  <div className="d-flex gap-4">
                    <div className="d-flex py-1">
                      <span>Per page : </span>
                      <select
                        onChange={(e) =>
                          setSort({ ...sort, pageShort: e.target.value })
                        }
                        className="border-0 ms-1 whitesmoke px-2"
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
                          setSort({ ...sort, priceShort: e.target.value })
                        }
                        className="border-0 ms-1 whitesmoke px-2 "
                      >
                        <option value="default">Default</option>
                        <option value="hightestToLowest">
                          Highest to lowest
                        </option>
                        <option value="lowestToHighest">
                          Lowest to Highest
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="products">
                  <div className="shop-products">
                    {data?.products?.map((product) => (
                      <ShopProduct product={product} key={product?._id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default shop;
