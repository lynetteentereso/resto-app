import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";

const DeleteItem = (props) => {
    const dispatch = useDispatch();

    const onOrderItem = () => {
        dispatch({type: 'ADD_TO_CART', payload: props.item});
    }

    return (
        <div>
           <Button 
                onClick={onOrderItem}
                className='order'
                style={{
                    width: '16rem', 
                    marginTop: '15px',
                    background: '#f09c00',
                    borderColor: '#f09c00'
                }}
            >
                <FaShoppingCart 
                    style={{
                        marginTop:'-5px',
                        marginRight: '3px',
                    }}
                />
                Order
            </Button>  
        </div>
    );
};

export default DeleteItem;