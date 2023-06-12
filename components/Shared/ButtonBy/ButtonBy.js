import React from 'react';

const ButtonBy = () => {
    return (
        <button
            // onClick={() => handleAddToCart(product)}
            className="buy-now-button"
        >
            Buy Now
            <i className="far plus-ico fa-plus-square text-white"></i>
        </button>
    );
};

export default ButtonBy;