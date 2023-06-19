import React from 'react';

const DeleveryAndService = () => {
    return (
        <div>
            <div style={{padding:'0px 16px 5px 0px'}} className="delivery-info">
                <h5>Delivery</h5>
                <div className="d-flex">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/marker--v1.png"
                            alt="marker--v1"
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center gap-2 w-100">
                        <p>Dhaka, Dhaka North, Banani Road No. 12 - 19 </p>
                        <p className="text-info">CHANGE</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/delivery--v1.png"
                            alt="delivery--v1"
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <p>
                                <span style={{ fontWeight: "bold" }}>
                                    Standard Delivery
                                </span>{" "}
                                9 Jun - 12 Jun
                            </p>
                            <p>3 - 6 day(s)</p>
                        </div>
                        <p>$ 2</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/cash-in-hand.png"
                            alt="cash-in-hand"
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <p>Cash on Delivery Available</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{padding:'0px 16px 5px 0px'}} className="service-info mt-3">
                <h4>Service</h4>
                <div className="d-flex">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/rollback.png"
                            alt="rollback"
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <p>14 days easy return</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/not-applicable.png"
                            alt="not-applicable"
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <p>Warranty not available</p>
                        </div>
                    </div>
                </div>
                {/* <ul>
          <li>100% Authentic</li>
          <li>14 days easy return</li>
          <li>Change of Mind applicable</li>
          <li>Warranty not available</li>
        </ul> */}
            </div>
        </div>
    );
};

export default DeleveryAndService;