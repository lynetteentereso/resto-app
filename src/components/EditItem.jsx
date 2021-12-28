import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { v4 as uuid} from 'uuid';

const EditItem = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setSave(false)}      
    const [newName,setNewName] = useState();
    const [newPrice,setNewPrice] = useState();
    const [newCategory,setNewCategory] = useState();
    const [newImage,setNewImage] = useState();
    const [save, setSave] =useState(false);

    const onEditItem = (e) => {
        e.preventDefault();
        let updatedItem = {
            id: props.id,
            name: newName,
            price: newPrice,
            category: newCategory,
            image: newImage
        }
        dispatch({type: 'EDIT_ITEM', payload: updatedItem})
        dispatch({type: 'ITEM_FILTER', payload: 'All'})
        setSave(true);
    }
    return (
        <div>
            <Row>         
                <span 
                    onClick={handleShow}
                    style={{cursor:'pointer'}}>
                    <FaEdit 
                        className='icon'
                        style={{
                            color: '#f09c00', 
                            marginTop:'-5px',
                            marginRight: '3px',
                            fontSize: '15px',
                        }}
                    /> 
                    Edit
                </span>
            </Row>
            <Modal show={show} onHide={handleClose}>
            {save ? <Alert style={{textAlign: 'center', background:'#f1c779', border: 'none', color: '#592005' }}>Item was successully updated!</Alert> : null }
            <Modal.Header className='my-modal-header'>
                <Row>
                   <Modal.Title>Edit Item</Modal.Title>
                </Row>
               </Modal.Header>
               <Modal.Body> 
                    <Form className='add-form' onSubmit={onEditItem}>
                        <Row className='mb-3'>
                            <Form.Label column sm={2}>
                            Name
                            </Form.Label>
                            <Col>
                                <Form.Control required value={newName} onChange={e => setNewName((e.target.value).charAt(0).toUpperCase()+(e.target.value).slice(1))} type='text' placeholder={newName}/>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Label column lg={2}>
                            Price
                            </Form.Label>
                            <Col>
                                <Form.Control required value={newPrice} type='number' onChange={e => setNewPrice(e.target.value)} type='text' placeholder='Php'/>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Label column lg={2}>
                                Category
                            </Form.Label>
                            <Col>
                                <Form.Select required value={newCategory} onChange={e => setNewCategory(e.target.value)} as='select' size='md' lg={2}>
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
                                <Form.Control required value={newImage} onChange={e => setNewImage(e.target.value)} type='text' placeholder='https://' />
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
                                onClick={save ? handleClose : onEditItem }
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

export default EditItem;