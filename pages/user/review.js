import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import SideBar from "../../components/User/SideBar/SideBar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useGetSuccessfulOrdersByEmailQuery } from "../../features/product/productApi";
import { useCreateReviewMutation } from "../../features/review/reviewApi";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Rating } from "@mui/material";
import { Cropper } from "react-cropper";
import { toast } from "react-hot-toast";

const review = () => {
  const [token, setToken] = useState();
  const router = useRouter();
  const componentRef = useRef();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showCropeModal, setShowCropeModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState({});
  const [ratings, setRatings] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const cropperRefs = useRef([]);
  const { user, isLoading } = useSelector((state) => state.auth);
  const { data, isLoading: orderLoading } = useGetSuccessfulOrdersByEmailQuery(
    user?.email
  );
  const [createReview, { isSuccess, isLoading: createLoading, isError }] =
    useCreateReviewMutation();


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);

  useEffect(() => {
    if (createLoading) {
      toast.loading("Loading...");
    }
    if (isSuccess) {
      toast.success("Review added successfully...!!");
      setShow(false);
      setSelectedImages([]);
      setReviewText("");
      setFinalImages([]);
    }
  }, [isSuccess]);
  const handleClose = () => {
    setShow(false);
    setSelectedImages([]);
    setReviewText("");
    setFinalImages([]);
  };
  const handleCloseCropeModal = () => {
    setSelectedImages([]);
    setShowCropeModal(false);
    setShow(true);
  };
  const handleOpenReviewModal = (product) => {
    setReviewProduct(product);
    setShow(true);
  };
  const handleImageChange = (event) => {
    const files = event?.target?.files;
    const imageArray = [];
    for (let i = 0; i < files?.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageArray.push(e.target.result);
        if (imageArray?.length === files?.length) {
          if (files?.length <= 3) {
            setShow(false);
            setShowCropeModal(true);
            setSelectedImages(imageArray);
          } else {
            setShow(true);
            setSelectedImages([]);
            toast.error("You can select only maximum 3 images");
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };
  // handle review submit
  const handleSubmit = () => {
    if (finalImages?.length < 1 && !reviewText) {
      toast.error("Please select images and enter your review details");
      return;
    }
    if (finalImages?.length >= 1 && !reviewText) {
      toast.error("Please add a review details");
      return;
    }
    if (reviewText && finalImages?.length < 1) {
      toast.error("Please select at least 1 image");
      return;
    }
    if (!ratings) {
      toast.error("Please rate your experience with us !!!");
      return;
    }
    // const data = new
    const reviewedBy = user?._id;
    const productId = reviewProduct?.productId;
    const data = new FormData();
    finalImages?.forEach((file, index) => {
      data.append("images", file);
    });
    data.append("review", reviewText);
    data.append("ratings", ratings);
    data.append("reviewedBy", reviewedBy);
    console.log({ productId });
    createReview({ data, productId, token });
  };
  // crop confirm handler
  const handleConfirmCrop = () => {
    let croppedImagesArray = [];
    let croppedImagesFile = [];
    const promises = [];
    selectedImages?.forEach((image, index) => {
      const cropper = cropperRefs?.current[index];
      if (!cropper) {
        return;
      }
      const canvas = cropper?.cropper?.getCroppedCanvas();
      if (canvas) {
        const promise = new Promise((resolve) => {
          canvas?.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg");
        }).then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          croppedImagesArray[index] = imageUrl;
          croppedImagesFile[index] = blob;
        });
        promises.push(promise); // Add the promise to the array
      }
    });
    Promise.all(promises).then(() => {
      setSelectedImages(croppedImagesArray);
      setFinalImages(croppedImagesFile);
    });
    setShowCropeModal(false);
    setShow(true);
  };
  return (
    <Layout>
      <div style={{ minHeight: "120vh" }} className="bg-gray-50">
        <div className="user-dashboard-container">
          <div className="dashboard-container-content">
            <SideBar></SideBar>

            <div className="dashbord-content-preview">
              <div className="dash-overflow-hidden">
                {orderLoading ? (
                  <p>Loading...</p>
                ) : data?.length < 1 ? (
                  <h4 className="text-center text-danger">
                    You haven't buy any product yet. <br /> If you want to give
                    a review please purchage a product at first...!!!
                  </h4>
                ) : (
                  <>
                    <div className="" style={{ height: "120vh" }}>
                      <div id="invoice-content" ref={componentRef}>
                        <div
                          className="order-container rounded-2"
                          style={{ backgroundColor: "whitesmoke" }}
                        >
                          <h4 className="text-center">
                            My Products :{" "}
                            {data?.reduce(
                              (total, order) => total + order?.products?.length,
                              0
                            )}
                          </h4>

                          <div className="mt-4 ">
                            <Table
                              responsive
                              style={{
                                background: "white",
                              }}
                              className="rounded-2"
                            >
                              <thead
                                className=""
                                style={{ backgroundColor: "" }}
                              >
                                <tr>
                                  <th>SR.</th>
                                  <th>IMAGE</th>
                                  <th>PRODUCT TITLE</th>
                                  <th className="text-center">REVIEW</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.map((order, index) =>
                                  order?.products.map((product, i) => {
                                    console.log(product,'product under review');
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <img
                                            width={40}
                                            height={40}
                                            src={product?.thumbnail}
                                            alt=""
                                          />
                                        </td>
                                        <td
                                          className="d-sm-block d-lg-none"
                                          style={{
                                            minWidth: "130px",
                                            minHeight: "65px",
                                          }}
                                        >
                                          {product?.title?.length < 40
                                            ? product?.title
                                            : `${product?.title?.slice(
                                              0,
                                              40
                                            )}...`}
                                        </td>
                                        <td
                                          className="d-lg-block d-sm-none"
                                          style={{
                                            minWidth: "130px",
                                            minHeight: "57px",
                                          }}
                                        >
                                          {product?.title}
                                        </td>

                                        <td>
                                          <button
                                            onClick={() =>
                                              handleOpenReviewModal(product)
                                            }
                                            className="btn btn-info text-white d-flex align-items-center mx-auto"
                                          >
                                            +
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  })
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                      <Modal
                        className="pb-5"
                        style={{ zIndex: "10001" }}
                        show={show}
                        size="lg"
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Add Review for{" "}
                            <span className="text-info">
                              {reviewProduct?.title?.length < 21
                                ? reviewProduct?.title
                                : `${reviewProduct?.title?.slice(0, 19)}...`}
                            </span>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              {selectedImages?.length <= 0 ? (
                                <>
                                  <ul
                                    className="text-danger"
                                    style={{ listStyleType: "initial" }}
                                  >
                                    <li> You can add multiple images</li>
                                    <li> Maximum you can upload 3 images</li>
                                  </ul>
                                  <Form.Label>Select Image</Form.Label>

                                  <Form.Control
                                    type="file"
                                    accept="image/*"
                                    placeholder=""
                                    autoFocus
                                    multiple
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                  />
                                </>
                              ) : (
                                <div
                                  style={{ marginTop: "-10px" }}
                                  className="d-flex justify-content-center flex-wrap"
                                >
                                  {selectedImages?.map((image, index) => (
                                    <img
                                      className="border"
                                      key={index}
                                      src={image}
                                      alt={`Selected Image ${index + 1}`}
                                      style={{
                                        width: "200px",
                                        height: "auto",
                                        marginRight: "10px",
                                        marginTop: "10px",
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label>Enter your review</Form.Label>
                              <Form.Control
                                placeholder="Type here"
                                defaultValue={reviewText}
                                onChange={handleReviewChange}
                                as="textarea"
                                rows={3}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 d-flex align-items-center"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label className="mb-0">
                                Select your rating :{" "}
                              </Form.Label>
                              <Rating
                                className="ms-2 d-block"
                                name="simple-controlled"
                                value={ratings}
                                onChange={(event, newValue) => {
                                  setRatings(newValue);
                                }}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className="btn btn-danger"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSubmit}
                            className="btn btn-success"
                          >
                            Post A Review
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <Modal
                        className="pb-5 "
                        show={showCropeModal}
                        onHide={handleCloseCropeModal}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="">
                            Resize the images
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="mx-auto ">
                          {selectedImages?.length > 0 && (
                            <>
                              <div className="d-flex justify-content-center">
                                <Row
                                  className="g-5 mx-auto"
                                  style={{ gap: "15px" }}
                                >
                                  {selectedImages?.map((image, index) => (
                                    <Col lg="4" sm="1" xl="4" md="1">
                                      <div>
                                        <Cropper
                                          className="mb-3"
                                          src={image}
                                          style={{
                                            maxHeight: "100%",
                                            maxWidth: "100%",
                                          }}
                                          aspectRatio={1}
                                          guides={true}
                                          zoomable={false}
                                          autoCropArea={1}
                                          viewMode={1}
                                          ref={(cropper) => {
                                            cropperRefs.current[index] =
                                              cropper;
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                              <div className="d-flex justify-content-center gap-4 mt-2">
                                <Button
                                  className="btn btn-danger"
                                  onClick={handleCloseCropeModal}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="btn btn-success"
                                  onClick={handleConfirmCrop}
                                >
                                  Save
                                </Button>
                              </div>
                            </>
                          )}
                        </Modal.Body>
                      </Modal>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default review;
