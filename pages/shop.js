import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Button, Collapse, Container, Navbar, Nav } from 'react-bootstrap';
import ShopProduct from '../components/Product/ShopProduct';
import ShopSideBar from '../components/Shop/ShopSideBar/ShopSideBar';
import {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetSubCategoryQuery,
} from '../features/product/productApi';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import ShopPagination from '../components/Shared/Pagination/ShopPagination';
import { en } from '../locales/en';
import { bn } from '../locales/bn';
import DiscountProductCard from '../components/Product/DiscountProductCard';
import { Rating } from '@mui/material';

const shop = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : bn;
  const [params, setParams] = useState();
  const categoryTextParams = router.query?.category;

  const user = useSelector((state) => state.auth.user);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState();
  const [sort, setSort] = useState({
    perPage: 12,
    pageNumber: 1,
    priceSort: 0,
  });

  useEffect(() => {
    setParams(categoryTextParams);
  }, [router.query?.category]);

  const [filter, setFilter] = useState({
    category: '',
    childCategory: '',
    size: '',
    brand: [],
    price: [],
  });

  const { data, isLoading } = useGetAllProductsQuery({
    perPage: page,
  });

  const {
    data: products,
    isSuccess,
    isLoading: loading,
    isError,
    error,
  } = useGetProductsQuery({ sort, filter });

  return (
    <Layout title="Shop - Bangladesh Mart">
      <div style={{minHeight:'120vh'}} className="shop page-content">
        <div className="ps-4 ms-2 pe-3">
          <div className="row ">
            <aside className="col-lg-2 order-lg-first">
              <ShopSideBar
                data={data}
                filter={filter}
                setFilter={setFilter}
                params={params}
                t={t}
              />
            </aside>
            <div style={{ paddingLeft: '20px' }} className="col-lg-10 pl-lg-5">
              <div className="">
                <div className="widget w-100 pb-3 d-flex justify-content-between align-items-center">
                  <p className="fs-6 d-sm-none d-lg-block">
                    {t.shopPage.allProducts.productsCountTitle}: {data?.total}
                  </p>
                  <div className="d-flex shop-extra-filter">
                    <div className="d-flex py-1">
                      <span>{t.shopPage.allProducts.perPageTitle}: </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            perPage: Number(e.target.value),
                          })
                        }
                        className="ms-1 rounded px-2 border"
                      >
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <div className="d-flex py-1">
                      <span>{t.shopPage.allProducts.sortBy.title} : </span>
                      <select
                        onChange={(e) =>
                          setSort({
                            ...sort,
                            priceSort: Number(e.target.value),
                          })
                        }
                        className="ms-1 border rounded px-2 "
                      >
                        <option value={0}>
                          {t.shopPage.allProducts.sortBy.option1}
                        </option>
                        <option value={-1}>
                          {t.shopPage.allProducts.sortBy.option2}
                        </option>
                        <option value={1}>
                          {t.shopPage.allProducts.sortBy.option3}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="products">
                  {loading ? (
                    <div className="all-products-container-shop">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((elem, i) => {
                        return (
                          <div
                            key={i}
                            className="border shadow rounded loading-card-content"
                          >
                            <Skeleton
                              className="d-flex mx-auto mt-2"
                              style={{
                                width: '92%',
                                minHeight: '188px',
                                maxHeight: '189px',
                              }}
                            />
                            <div className="product-details-card p-2">
                              <div
                                style={{ marginTop: '-14px' }}
                                className="product-title "
                              >
                                <span>
                                  <Skeleton />
                                </span>
                              </div>
                              <div className="product-price">
                                <p className="mb-0 ">
                                  <Skeleton style={{ width: '50px' }} />
                                </p>
                              </div>
                              <div className="old-price">
                                <del style={{ display: 'inline-block' }}>
                                  <Skeleton style={{ width: '50px' }} />
                                </del>
                                <span className="ms-1">
                                  <Skeleton style={{ width: '30px' }} />
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Skeleton style={{ width: '80px' }} />
                                <Skeleton
                                  className="ms-1"
                                  style={{ width: '30px' }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="shop-products">
                      {products?.data?.map((product, index) => (
                        <ShopProduct
                          product={product}
                          key={index}
                        ></ShopProduct>
                      ))}
                      {/* {loadedProducts === 0 && <p>No products found.</p>} */}
                    </div>
                  )}
                </div>
              </div>
              {!loading && (
                <div className=" shop-pagination">
                  <ShopPagination
                    setSort={setSort}
                    sort={sort}
                    pageFound={products?.pageFound}
                    data
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default shop;
