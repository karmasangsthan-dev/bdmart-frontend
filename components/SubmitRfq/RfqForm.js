import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast from 'react-hot-toast';
import { useGetCreateRFQMutation, useGetSearchProductQuery } from '../../features/product/productApi';

const RfqForm = () => {
    const router = useRouter();
    const [showSuggestions, setShowSuggetions] = useState(false)
    const [rfqProducts, setRfqProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedProductExtraData, setSelectedProductExtraData] = useState({
        quantity: 0,
        color: '',
        size: ''
    });
    const [getCreateRFQ, { isSuccess: isSuccessRFQ, isError: isErrorRFQ, error: errorRFQ }] = useGetCreateRFQMutation();
    const [selectedModalData, setSelectedModalData] = useState({
        color: '',
        size: '',
        quantity: ''
    });
    console.log({ rfqProducts });
    const [variant, setVariant] = useState();
    const [productText, setProductText] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [clearAllProductsShowModal, setClearAllProductsShowModal] = useState(false);
    const [clearLastProductsShowModal, setClearLastProductsShowModal] = useState(false);

    const { data, isLoading: isSearchLoading, isError, error, refetch } =
        useGetSearchProductQuery(productText);

    const searchProducts = data?.data;
    console.log({ searchProducts });
    const handleClose = () => setShowModal(false);
    useEffect(() => {
        if (productText.length > 0) {
            setShowSuggetions(true)
        }
        else {
            setShowSuggetions(false)
        }
    }, [productText])
    useEffect(() => {
        setProductText('')
        if (selectedProduct?.title) {
            setShowSuggetions(false);
            console.log({ selectedProduct });
            setShowModal(true)
        }
        else {

        }
    }, [selectedProduct])
    const handleClearAllProducts = () => {
        setClearAllProductsShowModal(true)
    }

    const updatedVariants = [];

    for (let index = 0; index < selectedProduct?.variants?.length; index++) {
        const variant = selectedProduct.variants[index];

        if (variant) {
            const matchingColorVariant = updatedVariants.find(
                (v) =>
                    v.color.r === variant.color.r &&
                    v.color.g === variant.color.g &&
                    v.color.b === variant.color.b &&
                    v.color.a === variant.color.a
            );

            if (matchingColorVariant) {
                matchingColorVariant.sizes.push({
                    size: variant.size,
                    oldPrice: variant.oldPrice,
                    price: variant.price,
                    stock: variant.stock,
                    status: variant.status,
                    _id: variant?._id,
                });
            } else if (!matchingColorVariant) {
                const newVariant = {
                    color: variant?.color,
                    image: variant?.image,
                    sizes: [
                        {
                            size: variant.size,
                            oldPrice: variant.oldPrice,
                            price: variant.price,
                            stock: variant.stock,
                            status: variant.status,
                            _id: variant?._id,
                        },
                    ],
                };
                updatedVariants.push(newVariant);
            }
        }
    }
    const newProductStructure = {
        ...selectedProduct,
        variants: updatedVariants,
    };


    const handleSelectedProductToRFQ = ({ selectedProduct, selectedProductExtraData }) => {
        const updatedProduct = {
            ...selectedProduct,
            ...selectedProductExtraData
        };
        setRfqProducts([...rfqProducts, updatedProduct]);
        setSelectedProduct({})
        setVariant({})
        setSelectedModalData({
            color: '',
            size: '',
            quantity: ''
        })
        handleClose();
    }
    console.log(rfqProducts);

    const handleSubmitRfq = (event) => {
        event.preventDefault();
        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value;
        const fullName = firstName + (' ') + lastName;
        const phoneNo = event.target.tel.value
        const company = event.target.company.value
        const role = event.target.role.value
        const notes = event.target.notes.value
        const PONumber = event.target.PONumber.value
        const doNotShip = event.target.doNotShip.value
        const assignTo = event.target.assignTo.value

        const data = { fullName, phoneNo, company, role, notes, PONumber, doNotShip, assignTo }
        getCreateRFQ(data)

    }

    useEffect(() => {
        console.log({ errorRFQ });
        if (isSuccessRFQ) {
            toast.success("Successfully submitted request for quote !!", { id: "getCreateRFQ" });
            router.push('/submit-rfq')
        }
        else if (isErrorRFQ) {
            toast.error(errorRFQ?.data?.error, { id: "getCreateRFQ" });
        }
    }, [isSuccessRFQ, isErrorRFQ])
    return (
        <div className='rfq-container'>
            <div className="rfq-banner py-3">

                <div className='bg-white rfq-form-container mx-auto px-5 py-4'>
                    <h5 className='py-2 fw-bold'>REQUEST A QUOTE</h5>
                    <form onSubmit={handleSubmitRfq} className='create-rfq-form'>
                        <div className='first'>
                            <div>
                                <label htmlFor='firstName' className='custom-required-asterisk'>First Name</label>
                                <input className='form-control mt-1 ' type="text" placeholder='First Name' name='firstName' id='firstName' />
                            </div>
                            <div>
                                <label htmlFor='lastName' className='custom-required-asterisk'>Last Name</label>
                                <input className='form-control mt-1' type="text" placeholder='Last Name' id='lastName' name='lastName' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="email" className='custom-required-asterisk'>Email Address</label>
                                <input className='form-control mt-1' type="email" placeholder='Email Address' name='email' id='email' />
                            </div>
                            <div>
                                <label className='custom-required-asterisk' htmlFor="tel">Phone Number</label>
                                <input className='form-control mt-1' type="tel" id='tel'
                                    name='tel' placeholder='Phone Number' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label className='custom-required-asterisk' htmlFor="company">Company</label>
                                <input className='form-control mt-1' type="text" placeholder='Company' name='company' id='company' />
                            </div>
                            <div>
                                <label htmlFor="role">Role</label>
                                <input className='form-control mt-1' type="text" id='role'
                                    name='role' placeholder='Role' />
                            </div>
                        </div>
                        <div className=' mt-3'>
                            <div>
                                <label className='custom-required-asterisk' htmlFor="notes">Notes</label>
                                <textarea className='form-control mt-1' id="notes" name="notes" />
                            </div>
                        </div>

                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="">PO Number</label>
                                <input className='form-control mt-1' type="text" placeholder='PO Number ' name='PONumber' id='PONumber' />
                            </div>
                            <div>
                                <label htmlFor="">Do not ship later than</label>
                                <input className='form-control mt-1' type="date" id='ship'
                                    name='doNotShip' placeholder='Do not ship later than' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="assigned">Assigned To</label>
                                <input className='form-control mt-1' type="text" placeholder='Assigned To' name='assignTo' id='assigned' />
                            </div>

                        </div>


                        <div>
                            <h4 className='mt-5'>Products</h4>
                        </div>
                        {/* <div>
                            <button>Add a product</button>
                        </div> */}
                        <div className='mt-3'>
                            <label htmlFor="">Search Product by Name</label>
                            {/* <select className='form-control'>
                                <option selected >--Select a product--</option>
                                <option >Product 1</option>
                                <option >Product 2</option>
                            </select> */}
                            <input value={productText} onChange={(e) => setProductText(e.target.value)} className='form-control mt-2' type="text" placeholder='Enter product name' />

                            <div className='rfq-product-suggetions-container'>
                                {showSuggestions && <div className='rfq-product-suggetions'>
                                    <ul>
                                        {searchProducts?.length && searchProducts?.map(product => {
                                            return (
                                                <li onClick={() => setSelectedProduct(product)} key={product?.id}><img style={{ marginRight: '5px' }} width='20' src={product?.image} alt="" />{product?.title}</li>
                                            )
                                        })}

                                    </ul>
                                </div>}
                            </div>

                            <div className='confirmed-selected-all-products'>
                                {rfqProducts?.length > 0 ? <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">SL NO</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Color</th>
                                                <th scope="col">Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rfqProducts?.map((product, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{product?.title}</td>
                                                        <td>{product?.quantity}</td>
                                                        <td className='product-colors-nav-rfq'>
                                                            <a
                                                                style={{
                                                                    border: `${product?.color === 'rgba(255, 255, 255, 1)' ? '2px solid gray' : 'none'}`,
                                                                    backgroundColor: product?.color,
                                                                }}

                                                            ></a>
                                                        </td>
                                                        <td>{product?.size}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div> :
                                    <div>
                                        <p className='text-danger'>"No products are selected yet. Please search and select first...!!"</p>
                                    </div>}

                            </div>
                            {
                                rfqProducts?.length > 0 && <div className='d-flex justify-content-between'>
                                    <button onClick={() => setClearLastProductsShowModal(true)}
                                        type='button' className='btn  btn-warning mt-3'>Clear Last Product</button>
                                    <button
                                        onClick={() => setClearAllProductsShowModal(true)}
                                        type='button' className='btn btn-danger mt-3'>Clear All Products</button>
                                </div>
                            }
                        </div>
                        <div className='checkbox-container'>
                            <input type="checkbox" class="form-check-input" id="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                            <label class="form-check-label" for="checkbox">I agree with <span onClick={() => window.open('https://bangladeshmart.com.bd/terms-and-conditions', '_blank')}>terms conditions</span> and <span onClick={() => window.open('https://bangladeshmart.com.bd/privacy-policy', '_blank')}>privacy policy</span></label>
                        </div>
                        {isChecked ? <div className='my-5'>
                            <button style={{ fontSize: '20px' }} className='btn btn-success '>Submit RFQ</button>
                        </div> : <div className='my-5'>
                            <button style={{ fontSize: '20px' }} className='btn btn-success disabled'>Submit RFQ</button>
                        </div>}
                    </form>

                </div>

            </div>
            <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <img className='d-flex mx-auto border p-2 rounded-circle' style={{ width: '70px', height: '70px', cursor: 'pointer' }} src={selectedProduct?.thumbnail} alt="" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 product-colors-nav-rfq"
                        >
                            <Form.Label className='custom-required-asterisk'>Select Color: </Form.Label>
                            <div className='d-flex ms-4'>
                                {newProductStructure?.variants &&
                                    newProductStructure?.variants?.map(
                                        (variantItem, index) => {

                                            return (
                                                <a
                                                    key={index}
                                                    onClick={(e) => {
                                                        setSelectedModalData(prevState => ({ ...prevState, color: `rgba(${variantItem.color.r}, ${variantItem.color.g}, ${variantItem.color.b}, ${variantItem.color.a})` }))
                                                        setSelectedProductExtraData(prevState => ({ ...prevState, color: `rgba(${variantItem.color.r}, ${variantItem.color.g}, ${variantItem.color.b}, ${variantItem.color.a})` }));
                                                        setVariant(variantItem);
                                                        console.log(`altaf rgba(${variantItem.color.r}, ${variantItem.color.g}, ${variantItem.color.b}, ${variantItem.color.a})`);
                                                    }}
                                                    style={{

                                                        border: variantItem?.color.r == '252' && variantItem?.color.g == '252' && variantItem?.color.b == '252' ? `1px solid #ddd` : '1px solid #eee',
                                                        backgroundColor: `rgba(${variantItem.color.r}, ${variantItem.color.g}, ${variantItem.color.b}, ${variantItem.color.a})`,
                                                    }}
                                                    className={`${variant?.color?.r === variantItem?.color?.r &&
                                                        variant?.color.g === variantItem?.color?.g &&
                                                        variant?.color.b === variantItem?.color?.b &&
                                                        variant?.color.a === variantItem?.color?.a
                                                        ? "active"
                                                        : ""
                                                        } `}
                                                ></a>
                                            )
                                        }
                                    )}
                            </div>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label htmlFor='size1' className='custom-required-asterisk'>Select Size</Form.Label>
                            <select onChange={(e) => {
                                setSelectedModalData(prevState => ({ ...prevState, size: e.target.value }))
                                setSelectedProductExtraData(prevState => ({ ...prevState, size: e.target.value }))
                            }} className='form-control' id='size1'>
                                <option selected >--Select Size--</option>
                                {variant?.sizes ? (
                                    variant?.sizes?.map((item, i) => {
                                        return (
                                            <option
                                                key={item?._id}
                                                className="text-uppercase"
                                            >
                                                {item?.size}
                                            </option>
                                        );
                                    })
                                ) : (
                                    <option value="">None</option>
                                )}
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='quantity1' className='custom-required-asterisk'>Quantity</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setSelectedProductExtraData(prevState => ({ ...prevState, quantity: e.target.value }))
                                    setSelectedModalData(prevState => ({ ...prevState, quantity: e.target.value }))
                                }}
                                type="number"
                                id='quantity1'
                                placeholder="Quantity"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={selectedModalData?.color && selectedModalData?.quantity && selectedModalData?.size ? false : true} onClick={() => handleSelectedProductToRFQ({ selectedProduct, selectedProductExtraData })} variant="success">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* clear all products show modal  */}
            <Modal show={clearAllProductsShowModal} onHide={() => setClearAllProductsShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'><span role="img" aria-label="Danger">
                        ⚠️
                    </span>{' '} Confirmation for All products !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>Are you sure you want to clear all products?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setClearAllProductsShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleClearAllProducts()}>
                        Clear All
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* clear last product modal  */}
            <Modal show={clearLastProductsShowModal} onHide={() => setClearLastProductsShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-danger'><span role="img" aria-label="Danger">
                        ⚠️
                    </span>{' '} Confirmation for Last Product !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>Are you sure you want to clear last added product ??</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setClearLastProductsShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                        const updatedRfqProducts = [...rfqProducts];
                        const removed = updatedRfqProducts.pop();
                        setRfqProducts(updatedRfqProducts);
                        if (removed) {
                            setClearLastProductsShowModal(false)
                            toast.success('Removed last product...')
                        }
                    }}>
                        Clear Last Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default RfqForm;