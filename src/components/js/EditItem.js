import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";

const EditItem = (props) => {

    const categories = useSelector(state => state.categories)

    const dispatch = useDispatch();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    
    const [newName,setNewName] = useState(props.item.name);
    const [newPrice,setNewPrice] = useState(props.item.price);
    const [newCategory,setNewCategory] = useState(props.item.category);
    const [newImage,setNewImage] = useState(props.item.image);

    
    const formValidation = () => {
        let isValid = true;
        if(newName.length === 0 || newPrice.length === 0 || newCategory.length === 0 || newImage.length === 0 ){
            isValid = false;
        }
        return isValid;
       }
    
    const submitEditFormHandler = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
        let editedItem = {id: props.item.id, name: newName, price: newPrice, category: newCategory, image: newImage}  
            dispatch( {type: 'EDIT_ITEM', payload: editedItem} );
            setNewName(newName);
            setNewPrice(newPrice);
            setNewCategory(newCategory);
            setNewImage(newImage);   
        } else {
           alert('Please fill out all the fields');
        }     
    }
    
    return (
        <div>
            <Button className='menu-btn' onClick={handleShow} variant='info' size='md'><FaEdit />&nbsp;&nbsp;&nbsp;Edit</Button> 
           
           <Modal show={show} onHide={handleClose} >
               <Modal.Header className='my-modal-header'>
                   <Modal.Title>Edit Item (ID #{props.item.id})</Modal.Title>
                   <button type='button' className='close' data-dismiss='modal' onClick={handleClose}>
                        <span aria-hidden='true'>&times;</span>
                   </button>
               </Modal.Header>
               <Modal.Body>
               <Form className='add-form' onSubmit={submitEditFormHandler}>
                        <Row>
                            <Form.Label column lg={2}>
                            Name
                            </Form.Label>
                            <Col>
                                <Form.Control value={newName} type='text' placeholder='Item Name' onChange={e => setNewName((e.target.value).charAt(0).toUpperCase()+(e.target.value).slice(1))}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column lg={2}>
                            Price
                            </Form.Label>
                            <Col>
                                <Form.Control value={newPrice} type='text' placeholder='Php' onChange={e => setNewPrice(e.target.value)}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column lg={2}>
                                Category
                            </Form.Label>
                            <Col>
                            <Form.Control value={newCategory} onChange={e => setNewCategory(e.target.value)} as='select' size='md' lg={2}>
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
                                <Form.Control value={newImage} type='text' placeholder='https://'onChange={e => setNewImage(e.target.value)} />
                            </Col>
                        </Row> 
                        <br />    
                        <Button className='save-changes' variant='info' type='submit'>Update Item</Button>       
                    </Form>
               </Modal.Body>
           </Modal>
        </div>
    );
};

export default EditItem;