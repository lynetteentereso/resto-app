import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditItem from './EditItem';
import { Row, Col, Button } from "react-bootstrap";
import '../css/Item.css';
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Item = () => {

    const items = useSelector(state => state.items);
    const selectedCategory = useSelector(state => state.selectedCategory);

    const dispatch = useDispatch();

    return (
        <div>
            { 
              items.filter( item => { if( selectedCategory === 'All Categories'){return item;} return item.category === selectedCategory }).map( item => 
                <div className ='main-item-container'>
                    <Row className='item-data-container'>
                        <Col className='image-container col-md-6'>
                            <img className='item-image' src={item.image} alt = {item.name}  />
                        </Col>
                        <Col className='text-container'>
                            <h4>{item.name}</h4>
                            <p className='price'>Php {item.price}</p>
                            <p className='category'>{item.category}</p>
                            <Button className='menu-btn' onClick={ () => dispatch( {type: 'ADD_TO_CART', payload: item} ) } variant='info' ><FaShoppingCart /> Order</Button>
                            <EditItem item={item} />
                            <Button className='menu-btn' onClick={ () => dispatch( {type: 'DELETE_ITEM', payload: item.id} ) } variant='info' ><MdDelete />Delete</Button>
                        </Col>
                    </Row>
                </div>
              )
            }
        </div>
    );
};

export default Item;