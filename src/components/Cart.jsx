import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Container } from 'react-bootstrap';
import { BsPlus } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import { v4 as uuid} from 'uuid';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let subtotal = 0;
        cart.map( cartItem => subtotal+=(cartItem.quantity * cartItem.price));
        setTotal(subtotal);
      }, [cart])


    return (
        <div>
            {
               cart?.length === 0 
               ? <p style={{color: 'gray'}}>Your cart is empty.</p>
               : <React.Fragment>

                <Table responsive 
                    style={{fontSize: '14px'}}    
                >
                    <thead>
                        <tr className='thead'>
                                <th>Items</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(cartItem =>
                            (
                                <React.Fragment key={uuid()}>

                                    <tr>
                                        <td className='td-name'>{cartItem.name}</td>
                                        <td className='td'>Php {cartItem.price}</td>
                                        <td className='td'>
                                            <span 
                                                onClick={()=>dispatch({type: 'DECREASE_QUANTITY', payload: cartItem.id})} 
                                                style={{color: '#f09c00', fontWeight:'bolder', cursor:'pointer', marginRight:'5px'}}
                                            >
                                                <IoIosRemove/> 
                                            </span>
                                            {cartItem.quantity}
                                            <span 
                                                onClick={()=>dispatch({type: 'INCREASE_QUANTITY', payload: cartItem.id})} 
                                                style={{color: '#f09c00', fontWeight:'bolder', cursor:'pointer', marginLeft:'5px'}}
                                            >
                                                <BsPlus/> 
                                            </span>
                                        </td>
                                        <td className='td'>
                                            P{cartItem.quantity * cartItem.price}
                                            <span className='remove' onClick={()=>dispatch( {type: 'REMOVE_FROM_CART', payload: cartItem})}>
                                                <IoTrashOutline style={{marginLeft:'3px', marginTop: '-3px', color: 'red', cursor:'pointer'}}/>
                                            </span>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ) 
                        )
                        }
                    </tbody>    
            </Table>
            <Row className='d-flex justify-content-end'>
            <h5 className='text-end' style={{marginRight:'10px'}}>Total: P{total} </h5>
            </Row>
            </React.Fragment>
            }
            
        </div>
    );
};

export default Cart;