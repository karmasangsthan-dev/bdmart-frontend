import React from 'react';

const DeleveryAndService = ({ product }) => {

    const getTime = (data) => {
        const currentDate = new Date();

        if (typeof data !== 'string') {
            throw new TypeError('Invalid data format. Expected a string.');
        }

        const dateParts = data.split('-').map(Number);

        if (dateParts?.length !== 2 || dateParts.some(isNaN)) {
            throw new TypeError('Invalid data format. Expected "min-max" format.');
        }

        const [minDays, maxDays] = dateParts;

        const minDeliveryDate = new Date(currentDate);
        minDeliveryDate.setDate(minDeliveryDate.getDate() + minDays);

        const maxDeliveryDate = new Date(currentDate);
        maxDeliveryDate.setDate(maxDeliveryDate.getDate() + maxDays);

        // Format the delivery dates
        const minDateFormatted = minDeliveryDate.getDate() + ' ' + getMonthName(minDeliveryDate.getMonth());
        const maxDateFormatted = maxDeliveryDate.getDate() + ' ' + getMonthName(maxDeliveryDate.getMonth());

        // Create the desired format
        const deliveryTimeFormatted = minDateFormatted + ' - ' + maxDateFormatted + '\n';

        return deliveryTimeFormatted;
    }

    const getMonthName = (monthIndex) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[monthIndex];
    }

    const delTime = product?.deleveryTime ?  product?.deleveryTime?.split(' ')[0] : '1-2';

    let formattedDeliveryTime;
    try {
        formattedDeliveryTime = getTime(delTime);
    } catch (error) {
        // Handle or log the error
        console.error('Error:', error);
    }



    return (
        <div>
            <div className="delivery-info">
                {/* <h5>Delivery</h5>
                <div className="d-flex">
                    <div className="me-2">
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/color/48/marker--v1.png"
                            alt="marker--v1"
                        />
                    </div>
                    <div className="d-flex justify-content-between  gap-2 w-100">
                        <p>Dhaka, Dhaka North, Banani Road No. 12 - 19 </p>
                        <p className="text-info">CHANGE</p>
                    </div>
                </div> */}
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
                                {formattedDeliveryTime}
                            </p>
                            {
                                product.deleveryTime ? <p>{product.deleveryTime.split(' ')[0]} day(s)</p> : <p>1-2 day(s)</p>
                            }
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
                            {product?.isCashOnDelevery === 'Yes' ? <p>Cash on Delivery Available</p> : <p className='text-danger'>Cash on Delivery is Unavailable</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="service-info ">
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
                            <p>{product?.returnAvailable ? product?.returnAvailable : '1 Day'} easy return</p>
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
                            {product?.warrentyAvailable ? <p>{product?.warrentyAvailable} Warranty</p> : <p>Warranty not available</p>}
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