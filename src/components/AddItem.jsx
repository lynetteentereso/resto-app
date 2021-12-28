import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';
import { RiAddBoxFill } from "react-icons/ri";
import { v4 as uuid} from 'uuid';

const AddItem = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setSave(false)}      
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('Food');
    const [image,setImage] = useState('');
    const [save, setSave] =useState(false);

    const onSubmitAddForm = (e) => {
        e.preventDefault();
        let newItem = {
            id: uuid(),
            name,
            price,
            category,
            image
        }
        dispatch({type: 'ADD_ITEM', payload: newItem})
        dispatch({type: 'ITEM_FILTER', payload: 'All'})
        setSave(true);
        setName('');
        setPrice('');
        setCategory('Food');
        setImage('');
    }

    return (
        <div>  
            <Row>         
                <span style={{cursor:'pointer'}} onClick={handleShow}>
                <RiAddBoxFill 
                style={{
                    color: '#f09c00',
                    fontSize: '20px',
                    marginRight: '3px',
                    marginTop: '-3px'
                }}
                />
                Add Item
                </span>
            </Row>           
            <Modal show={show} onHide={handleClose} >

                {save ? <Alert style={{textAlign: 'center', background:'#f1c779', border: 'none', color: '#592005' }}>New item added!</Alert> : null }

               <Modal.Header className='my-modal-header'>
                <Row>
                   <Modal.Title>Add New Item</Modal.Title>
                </Row>
               </Modal.Header>
               <Modal.Body> 
                    <Form className='add-form' onSubmit={onSubmitAddForm}>
                        <Row className='mb-3'>
                            <Form.Label column sm={2}>
                            Name
                            </Form.Label>
                            <Col>
                                <Form.Control required value={name} onChange={e => setName((e.target.value).charAt(0).toUpperCase()+(e.target.value).slice(1))} type='text' placeholder='Item Name'/>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Label column lg={2}>
                            Price
                            </Form.Label>
                            <Col>
                                <Form.Control required value={price} type='number' onChange={e => setPrice(e.target.value)} type='text' placeholder='Php'/>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Label column lg={2}>
                                Category
                            </Form.Label>
                            <Col>
                                <Form.Select required value={category} onChange={e => setCategory(e.target.value)} as='select' size='md' lg={2}>
                                    {
                                        categories.filter(category => category !== 'All').map(category => (
                                            <option key={uuid()} value={category}>{category}</option>
                                            )  
                                        )    
                                    }
                                </Form.Select>
                            </Col>
                        </Row>   
                        <Row className='mb-3'>
                            <Form.Label column lg={2}>
                            Image
                            </Form.Label>
                            <Col>
                                <Form.Control required value={image} onChange={e => setImage(e.target.value)} type='text' placeholder='https://' />
                            </Col>
                        </Row> 
                        <Row className='mt-5 mb-1 d-flex justify-content-end'>    
                            { save 
                                ? null 
                                : <Button 
                                    onClick={handleClose}
                                    className='form-close-btn'
                                    type='submit'
                                    >
                                        Exit Without Saving
                                    </Button>  
                            }
                            <Button 
                                onClick={save ? handleClose : onSubmitAddForm }
                                className='form-save-btn'
                                type='submit'
                                style={{
                                    margin: '0 10px',
                                    width: '45%',
                                    background: '#f09c00',
                                    borderColor: '#f09c00'
                                }}
                            >
                                { save ? 'Back to Menu' : 'Save New Item' }
                            </Button>   
                        </Row>    
                    </Form>
               </Modal.Body>
           </Modal>
        </div>
    );
};

export default AddItem;