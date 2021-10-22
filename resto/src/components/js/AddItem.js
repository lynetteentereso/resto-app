import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { IoAddOutline } from "react-icons/io5";

const AddItem = () => {

    const items = useSelector(state => state.items);
    const categories = useSelector(state => state.categories)

    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('Food');
    const [image,setImage] = useState('');
    
    const formValidation = () => {
        let isValid = true;
        if(name.length === 0 || price.length === 0 || category.length === 0 || image.length === 0 ){
            isValid = false;
        }
        return isValid;
       }
    
    const submitAddFormHandler = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
            let newItem = { id: items.length + 1, name, price, category, image };
            dispatch( {type: 'ADD_ITEM', payload: newItem} );
            setName('');
            setPrice('');
            setCategory('Food');
            setImage('');   
        } else {
           alert('Please fill out all the fields');
        }     
    }
    
    return (
        <div className='add-item'>
            <Button className='add-btn' onClick={handleShow} variant='info' size='md'><IoAddOutline /> New Item</Button> 
           
           <Modal show={show} onHide={handleClose} >
               <Modal.Header className='my-modal-header'>
                   <Modal.Title>Add New Item</Modal.Title>
                   <button type='button' className='close' data-dismiss='modal' onClick={handleClose}>
                        <span aria-hidden='true'>&times;</span>
                   </button>
               </Modal.Header>
               <Modal.Body>
                    <Form className='add-form' onSubmit={submitAddFormHandler}>
                        <Row>
                            <Form.Label column lg={2}>
                            Name
                            </Form.Label>
                            <Col>
                                <Form.Control value={name} onChange={e => setName((e.target.value).charAt(0).toUpperCase()+(e.target.value).slice(1))} type='text' placeholder='Item Name'/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column lg={2}>
                            Price
                            </Form.Label>
                            <Col>
                                <Form.Control value={price} type='number' onChange={e => setPrice(e.target.value)} type='text' placeholder='Php'/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column lg={2}>
                                Category
                            </Form.Label>
                            <Col>
                                <Form.Control value={category} onChange={e => setCategory(e.target.value)} as='select' size='md' lg={2}>
                                    {
                                        categories.filter(cat => cat.value !== 'All Categories').map(cat => (
                                            <option key={Math.floor(Math.random() * 1000000000)} value={cat.value}>{cat.value}</option>
                                            )  
                                        )    
                                    }
                                </Form.Control>
                            </Col>
                        </Row>   
                        <br /> 
                        <Row>
                            <Form.Label column lg={2}>
                            Image
                            </Form.Label>
                            <Col>
                                <Form.Control value={image} onChange={e => setImage(e.target.value)} type='text' placeholder='https://' />
                            </Col>
                        </Row> 
                        <br />    
                        <Button variant='info' type='submit'>Save Item</Button>       
                    </Form>
               </Modal.Body>
           </Modal>
        </div>
    );
};

export default AddItem;