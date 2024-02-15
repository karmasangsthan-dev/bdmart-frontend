import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import toast from 'react-hot-toast';

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
    const [productText, setProductText] = useState('')
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
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

    const data = [
        { id: 1, image: 'https://static.vecteezy.com/system/resources/thumbnails/015/100/086/small/mango-transparent-background-free-png.png', title: 'Cute Mango fruites' },
        { id: 2, image: 'https://png.pngtree.com/element_our/png/20181129/vector-illustration-of-fresh-red-apple-with-single-leaf-png_248312.jpg', title: 'Sweet Apples' },
        { id: 3, image: 'https://static.vecteezy.com/system/resources/thumbnails/015/100/086/small/mango-transparent-background-free-png.png', title: 'Cute Mango fruites' }
    ]
    const handleSelectedProductToRFQ = ({ selectedProduct, selectedProductExtraData }) => {
        const updatedProduct = {
            ...selectedProduct,
            ...selectedProductExtraData
        };
        setRfqProducts([...rfqProducts, updatedProduct]);
        setSelectedProduct({})
        handleClose();
    }
    console.log(rfqProducts);

    const handleSubmitRfq =(event)=>{
        event.preventDefault()
        toast.error('Thanks but this features right now under development !!')
    }
    return (
        <div className='rfq-container'>
            <div className="rfq-banner py-3">

                <div className='bg-white rfq-form-container mx-auto px-5 py-4'>
                    <h5 className='py-2 fw-bold'>REQUEST A QUOTE</h5>
                    <form onSubmit={handleSubmitRfq} className='create-rfq-form'>
                        <div className='first'>
                            <div>
                                <label htmlFor="">First Name</label>
                                <input className='form-control mt-1' type="text" placeholder='First Name' id='firstName' />
                            </div>
                            <div>
                                <label htmlFor="">Last Name</label>
                                <input className='form-control mt-1' type="text" placeholder='Last Name' id='lastName' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="">Email Address</label>
                                <input className='form-control mt-1' type="email" placeholder='Email Address' name='email' id='email' />
                            </div>
                            <div>
                                <label htmlFor="">Phone Number</label>
                                <input className='form-control mt-1' type="tel" id='tel'
                                    name='tel' placeholder='Phone Number' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="">Company</label>
                                <input className='form-control mt-1' type="text" placeholder='Company' name='compnay' id='compnay' />
                            </div>
                            <div>
                                <label htmlFor="">Role</label>
                                <input className='form-control mt-1' type="text" id='role'
                                    name='role' placeholder='Role' />
                            </div>
                        </div>
                        <div className=' mt-3'>
                            <div>
                                <label htmlFor="">Notes</label>
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
                                    name='role' placeholder='Do not ship later than' />
                            </div>
                        </div>
                        <div className=' first mt-3'>
                            <div>
                                <label htmlFor="">Assigned To</label>
                                <input className='form-control mt-1' type="text" placeholder='Assigned To' name='assigned' id='assigned' />
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
                                        {data?.slice(0, 5).map(product => {
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
                                                        <td>{product?.color}</td>
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
                                    <button onClick={() => {
                                        const a = window.confirm('Are you sure want to delete last item ??')
                                        if (a) {
                                            toast.success('Removed...')
                                        }
                                    }}
                                        type='button' className='btn  btn-warning mt-3'>Clear Last Product</button>
                                    <button
                                        onClick={() => {
                                            const a = window.confirm('Are you sure want to delete all items ??')
                                            if (a) {
                                                setRfqProducts([])
                                                toast.success('Removed all...')
                                            }
                                        }}
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <img className='d-flex mx-auto border p-2 rounded-circle' style={{ width: '70px', height: '70px', cursor: 'pointer' }} src={selectedProduct?.image} alt="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                onChange={(e) => setSelectedProductExtraData(prevState => ({ ...prevState, quantity: e.target.value }))}
                                type="number"
                                id='quantity1'
                                placeholder="Quantity"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Select Color</Form.Label>
                            <select onChange={(e) => setSelectedProductExtraData(prevState => ({ ...prevState, color: e.target.value }))} className='form-control'>
                                <option selected >--Select color--</option>
                                <option >Red</option>
                                <option >White</option>
                                <option >Orange</option>
                                <option >SM</option>
                            </select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Select Size</Form.Label>
                            <select onChange={(e) => setSelectedProductExtraData(prevState => ({ ...prevState, size: e.target.value }))} className='form-control'>
                                <option selected >--Select Size--</option>
                                <option >XL</option>
                                <option >L</option>
                                <option >M</option>
                                <option >SM</option>
                            </select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handleSelectedProductToRFQ({ selectedProduct, selectedProductExtraData })} variant="success">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RfqForm;