import React from 'react';
import { useGetAllProductsCategoryQuery } from '../../../features/product/productApi';

const MobileMegaMenu = () => {
    const { data, isLoading, refetch } = useGetAllProductsCategoryQuery();
    const productCategories = data?.data;
    // const productCategories = [
    //     {
    //         id: 1,
    //         name: 'Fruits & Vegetables',
    //         iconUrl: '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340704%2Fcategory%2520icon%2Fcabbage_n59uv3.png&w=48&q=75',
    //     },
    //     // Add more categories as needed
    // ];
    const handleOpenSubcategory = ()=>{
        
    }
    return (
        <div className="relative grid gap-2 p-6" style={{ display: 'grid' }}>
            {isLoading && <p>Loading...</p> }
            {productCategories?.map(category => {
                console.log({ category });
                return (
                    <a
                        key={category.id}
                        className="p-2 d-flex gap-2 items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600 text-decoration-none text-dark"
                        role="button"
                    >
                        <span>
                            <img
                                alt=""
                                aria-hidden="true"
                                src={category?.thumbnail}
                                style={{
                                    display: 'block',
                                    maxWidth: '30px',
                                    width: '30px',
                                    height: '30px',
                                    background: 'none',
                                    opacity: 1,
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                }}
                            />
                        </span>
                        <div onClick={handleOpenSubcategory} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: '0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            width: '100%',
                            transition: 'color 0.3s ease',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}>
                            {category.category}
                            <span style={{transition: 'all 0.7s ease-in-out',display: 'inline-flex',position: 'relative',alignItems: 'flex-end',color: '#718096',}}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={48}
                                        d="M184 112l144 144-144 144"
                                    />
                                </svg>
                            </span>
                        </div>
                    </a>
                )
            })}
        </div >

    );
};

export default MobileMegaMenu;