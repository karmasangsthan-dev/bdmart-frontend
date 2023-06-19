import { Rating } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';

const AddReview = () => {
    const [value, setValue] = React.useState(0);
    const handleReviewFormSubmit = (event) => {
        event.preventDefault();
        if(value === 0){
            toast.error('Please rating at First')
        }
        else if (value > 1) {
            toast.success('Review Added Successfully !!');
        }

    }
    return (
        <div className='add-a-review-container'>
            <h4>Add a Review</h4>
            <p>Your email address will not be published. Required fields are marked *</p>
            <div className="d-flex">
                <h5>Your rating *</h5>
                <Rating
                    className='ms-2'
                    name="simple-controlled"
                    value={value}

                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </div>
            <form onSubmit={handleReviewFormSubmit} >
                <textarea id="reply-message" cols="30" rows="6" className="form-control review-text-area mt-2 mb-4" placeholder="Comment *" required></textarea>

                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control" id="reply-name" name="reply-name" placeholder="Name *" required />
                    </div>
                    <div className="col-md-6">
                        <input type="email" className="form-control" id="reply-email" name="reply-email" placeholder="Email *" required />
                    </div>
                </div>
                <div className="form-checkbox d-flex align-items-start my-3">
                    <input style={{ height: '24px' }} type="checkbox" className="custom-checkbox " id="signin-remember" name="signin-remember" />
                    <label className="form-control-label ms-2" htmlFor="signin-remember">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
                <button style={{ background: '#92b25a', borderColor: '#92b25a' }} type="submit" className="btn text-white px-5">Submit</button>
            </form>
        </div>
    );
};

export default AddReview;