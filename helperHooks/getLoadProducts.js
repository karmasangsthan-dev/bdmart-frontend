import React from 'react';

const getLoadProducts = async () => {
    async function loadProductsData() {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=bestSelling`
        const urlDisc = `${process.env.NEXT_PUBLIC_BACKEND_SITE_LINK}/api/v1/products/section?section=discount`
        const responseBestSelling = await fetch(url);

        const resDiscount = await fetch(urlDisc);
        const bestSelling = await responseBestSelling.json();
        const discount = await resDiscount.json();
        
        return { bestSelling, discount }
        // Return the data as props

    }
    return await loadProductsData();

};

export default getLoadProducts;