import React, { useState } from 'react';
import { useGetAllProductsCategoryQuery } from '../../../features/product/productApi';

const MobileMegaMenu = () => {
    const { data, isLoading, refetch } = useGetAllProductsCategoryQuery();
    const productCategories = data?.data;
    const [activeCategory, setActiveCategory] = useState(null);

    const handleToggleSubcategories = (category) => {
        setActiveCategory(category === activeCategory ? null : category);
    };
    return (
        <div className="relative grid gap-2 p-6" style={{ display: 'grid' }}>
            {isLoading && <p>Loading...</p>}
            {productCategories?.map(category => {
                console.log({ category });
                return (
                    <div onClick={() => handleToggleSubcategories(category)}>
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
                            <div style={{
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
                                <span style={{ transition: 'all 0.7s ease-in-out', display: 'inline-flex', position: 'relative', alignItems: 'flex-end', color: '#718096', }}>

                                    {
                                        activeCategory === category ? (
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
                                                    d="M112 184l144 144 144-144"
                                                />
                                            </svg>

                                        ) : (
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
                                        )
                                    }
                                </span>
                            </div>
                        </a>

                        {
                            activeCategory === category && (
                                <ul className="sub-cate-ul " onClick={(e) => e.stopPropagation()}>
                                    {category?.subCategories?.map((subCat) => {
                                        return (
                                            <li>
                                                <span className="subCategoryLink">
                                                    <span className="sub-cate-text">
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
                                                                strokeLinecap="square"
                                                                strokeLinejoin="round"
                                                                strokeWidth={32}
                                                                d="M400 256H112"
                                                            />
                                                        </svg>
                                                    </span>
                                                    {subCat?.subCategoryTitle}

                                                </span>
                                                {
                                                    subCat?.childCategories.length > 0 && (
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

                                                    )
                                                }
                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                        }


                    </div >
                )
            })}
        </div >

    );
};

export default MobileMegaMenu;