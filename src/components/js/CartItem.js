import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Table, Button, Modal } from 'react-bootstrap';
import { BsCaretUpSquare, BsCaretDownSquare } from "react-icons/bs";
import { FaShoppingCart, FaTrash} from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import '../css/CartItem.css';

const CartItem = () => {

    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch();

    const [total,setTotal] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    useEffect(() => {
        let subtotal = 0;
        cart.map( cartItem => subtotal+=(cartItem.quantity * cartItem.price));
        setTotal(subtotal);
      }, [cart])

    return (
        <div className='cart-item'>

            <Button className='cart-btn' onClick={handleShow} variant='info' size='md'>{cart.length == 0 ? <AiOutlineShoppingCart /> : <FaShoppingCart />}</Button> 

            <Modal  show={show} onHide={handleClose} >
               <Modal.Header className='my-modal-header'>
                   <Modal.Title>Cart</Modal.Title>
                   <button type='button' className='close' data-dismiss='modal' onClick={handleClose}>
                        <span aria-hidden='true'>&times;</span>
                   </button>
               </Modal.Header>
               {
                   cart.length == 0 ? <p className='my-modal-header' style={{margin: `20px`}}>Your cart is empty</p> :
               <Modal.Body>
                    <Table className='table'>
                    <thead className='thead'>
                            <th>Items</th>
                            <th></th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                    </thead>
                    {
                        cart.map(cartItem => 
                            <>
                            <tbody>
                                <td className='td'><img src={cartItem.image} alt={cartItem.name} /></td>
                                <td className='td-name'>{cartItem.name}</td>
                                <td className='td'>Php {cartItem.price}</td>
                                <td className='td'><span onClick={ () => dispatch( {type: 'DECREASE_QUANTITY', payload: cartItem.id} ) }><BsCaretDownSquare/></span>{cartItem.quantity}<span onClick={ () => dispatch( {type: 'INCREASE_QUANTITY', payload: cartItem.id} ) }><BsCaretUpSquare/></span></td>
                                <td className='td'>Php {cartItem.quantity * cartItem.price}<p className='remove' onClick={ () => dispatch( {type: 'REMOVE_FROM_CART', payload: cartItem.id} ) }><FaTrash /></p></td>
                            </tbody>
                        </>
                        )
                    }
                </Table>
                <Row className='total'>
                    <h3>Total: Php {total} </h3>
                </Row>
                </Modal.Body>
               }
           </Modal>
        </div>
    );
};

export default CartItem;