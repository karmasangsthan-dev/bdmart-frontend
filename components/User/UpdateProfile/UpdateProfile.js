import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileImageMutation, useUpdateProfileMutation } from "../../../features/auth/authApi";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { AiFillCamera } from 'react-icons/ai';
import Image from 'next/image';
import { Button, Modal } from 'react-bootstrap';
import { Cropper } from 'react-cropper';
import { fetchUser } from '../../../features/auth/authSlice';

const UpdateProfile = () => {
    const [token, setToken] = useState();
    const router = useRouter();
    const dispatch = useDispatch();
    const inputFileRef = useRef(null);
    const cropperRef = useRef(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setToken(token);
    }, []);

    const [updateProfileImage, { isSuccess: isImageSuccess, isLoading: isImageLoading, isError: isImageError, error }] =
        useUpdateProfileImageMutation({
            onSettled: () => api.invalidateTags("User"),
        });

    const [updateProfile, { isSuccess, isLoading, isError }] =
        useUpdateProfileMutation();

    useEffect(() => {

        if (isImageLoading) {
            toast.loading("Loading...", { id: "updateProfileImage" });
        }
        if (isImageSuccess) {
            dispatch(fetchUser(token));
            toast.success("Image Updated successful !!", { id: "updateProfileImage" });
            setShowModal(false);
        }
        if (isImageError) {
            toast.error("Something went wrong", { id: "updateProfileImage" })
            setShowModal(false);
        }

        if (isLoading) {
            toast.loading("Loading...", { id: "updateProfile" });
        }
        if (isSuccess) {
            dispatch(fetchUser(token));
            toast.success("Updated successful !!", { id: "updateProfile" });

        }

        if (isError) {
            toast.error(error?.data?.error, { id: "updateProfile" })
        }
    }, [isSuccess, isLoading, isError, isImageSuccess]);

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (fileObj) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCroppedImage(reader.result);
                setShowModal(true);
            };
            reader.readAsDataURL(fileObj);
        }
    };
    const handleConfirmCrop = () => {
        const id = user?._id;
        if (!cropperRef.current || !cropperRef.current.cropper) {
            return;
        }
        const canvas = cropperRef.current.cropper.getCroppedCanvas();
        if (canvas) {
            canvas.toBlob((blob) => {
                setCroppedImage(URL.createObjectURL(blob));

                const data = new FormData();
                data.append("image", blob);
                updateProfileImage({ id, token, data });
                setShowModal(false);
            }, "image/jpeg");
        }
    };
    const handleCloseModal = () => {
        setCroppedImage(null);
        inputFileRef.current.value = null;
        setShowModal(false);
    };
    const handleShowModal = () => {
        inputFileRef.current.click();
    };

    const handleCancel = () => {
        setCroppedImage(null);
        inputFileRef.current.value = null;
        setShowModal(false);
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const id = user?._id;
        const fullName = e.target.fullName.value;
        const email = user?.email;
        const contactNumber = e.target.contactNumber.value;
        const address = e.target.address.value;
        const data = { fullName, email, contactNumber, address };
        updateProfile({ id, token, data });
    };




    return (
        <div className="dash-order-table">
            <div style={{ borderRadius: "0.375rem" }}>
                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                    <h3 className='recent-order-title'>Update Profile :</h3>
                    <div
                        style={{ flexDirection: "column" }}
                        className="profile-userpic d-flex justify-content-center align-items-center"
                    >
                        <div className="" style={{ width: '100px', height: '100px' }}>
                            <Image
                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                layout="responsive"
                                width={100}
                                height={100}
                                src={user?.profilePicture || "https://i.ibb.co/x258KZb/profile.jpg"}
                                className="border p-1"
                                alt=""
                            />
                        </div>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            ref={inputFileRef}
                            style={{ display: "none" }}
                        />

                        <AiFillCamera
                            onClick={handleShowModal}
                            style={{ fontSize: "2.2rem" }}
                            className="profile-upload-img"
                        ></AiFillCamera>
                    </div>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlhtmlFor="name">Full Name:</label>
                                <input
                                    className="w-100 px-3 py-2 mb-3 form-control  "
                                    
                                    name="fullName"
                                    type="text"
                                    defaultValue={user?.fullName}
                                    placeholder="Enter Your Full Name"
                                />

                                <label htmlhtmlFor="name">Email:</label>
                                <input
                                    className="form-control form-control-red w-100 px-3 py-2 mb-3 "
                                    name="email"
                                    type="text"
                                    value={user?.email}
                                    contentEditable="false"
                                    readOnly
                                />


                            </div>
                            <div className="col-md-6">

                                <label htmlhtmlFor="name">Address:</label>
                                <input
                                    className="w-100 px-3 py-2 mb-3 text-capitalize form-control"
                                    
                                    type="text"
                                    defaultValue={user?.address}
                                    name="address"
                                    placeholder="Enter Your Address"
                                />
                                <label htmlhtmlFor="name">Contact Number:</label>
                                <input
                                    className="w-100 px-3 py-2 mb-3 form-control"
                                    name="contactNumber"
                                    
                                    defaultValue={user?.contactNumber}
                                    type="number"
                                    placeholder="Enter Your Contact Number"
                                />

                            </div>
                        </div>
                        <div className='update-profile-button-container'>
                            <button className='update-profile-button' type='submit'>Update Profile</button>
                        </div>

                    </form>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center mx-auto">Update Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {croppedImage ? (
                        <div>
                            <Cropper
                                src={croppedImage}
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                                aspectRatio={1}
                                guides={true}
                                zoomable={false}
                                autoCropArea={1}
                                viewMode={1}
                                ref={cropperRef}
                            />
                            <div className="d-flex justify-content-center gap-4 mt-2">
                                <Button className="btn btn-danger" onClick={handleCancel}>Cancel</Button>
                                <Button className="btn btn-success" onClick={handleConfirmCrop}>Save</Button>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={() => inputFileRef.current.click()}>Select Image</Button>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateProfile;