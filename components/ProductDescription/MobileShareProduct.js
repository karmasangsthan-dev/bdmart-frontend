import React from 'react';

const MobileShareProduct = () => {
    return (
        <div className="share mt-4 d-lg-none d-sm-block">
            <div className="d-flex align-items-center">
                <h6 className="mt-1">Share:</h6>
                <div className="share-buttons ms-2">
                    <a
                        href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
                        target="_blank"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a
                        href="https://twitter.com/intent/tweet?url=https://example.com"
                        target="_blank"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://pinterest.com/pin/create/button/?url=https://example.com&media=https://example.com/image.jpg&description=Description%20here"
                        target="_blank"
                    >
                        <i className="fab fa-pinterest"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileShareProduct;