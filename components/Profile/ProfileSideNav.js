import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileImageMutation } from "../../features/auth/authApi";
import { AiFillCamera } from "react-icons/ai";
import { fetchUser } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Button, FormControl, Modal } from "react-bootstrap";
import { Cropper } from "react-cropper";

export default function ProfileSideNav() {
  const [token, setToken] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);

  const [updateProfile, { isSuccess, isLoading }] =
    useUpdateProfileImageMutation({
      onSettled: () => api.invalidateTags("User"),
    });
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "updateProfile" });
    }
    if (isSuccess) {
      dispatch(fetchUser(token));
      toast.success("Updated successful !!", { id: "updateProfile" });
      setShowModal(false);
    }
  }, [isSuccess]);

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
        updateProfile({ id, token, data });
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

  return (
    <div className="profile-sidebar border border-1">
      <div
        style={{ flexDirection: "column" }}
        className="profile-userpic d-flex justify-content-center align-items-center"
      >


        <div className="mt-4" style={{ width: '130px', height: '130px' }}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            layout="responsive"
            width={100}
            height={100}
            src={user?.profilePicture || "https://i.ibb.co/x258KZb/profile.jpg"}
            className=""
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
      <div className="profile-usertitle">
        <div className="profile-usertitle-name text-capitalize">
          {user?.fullName}
        </div>
        <div className="profile-usertitle-job">Customer</div>
      </div>
      <div className="profile-usermenu">
        <ul className="nav flex-column">
          <li onClick={() => router.push('/profile')} className="nav-item">
            <a className="nav-link " href="#">
              Account Information
            </a>
          </li>
          <li onClick={() => router.push('/profile/my-orders')} className="nav-item">
            <a className="nav-link" href="#">
              My Orders
            </a>
          </li>
          <li onClick={() => router.push('/profile/my-review')} className="nav-item">
            <a className="nav-link" href="#">
              My Review
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Logout
            </a>
          </li>
        </ul>
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
}
