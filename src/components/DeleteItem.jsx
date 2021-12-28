import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Row,  Modal } from 'react-bootstrap';
import { IoTrashOutline } from "react-icons/io5";

const DeleteItem = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)}

    const onDeleteItem = () => {
        dispatch({type: 'DELETE_ITEM', payload: props.item});
        dispatch({type: 'ITEM_FILTER', payload: 'All'})
        setShow(false);
    }
    return (
        <div>
            <Row>         
                <span onClick={handleShow} style={{cursor: 'pointer'}}>
                    <IoTrashOutline 
                        className='icon'
                        style={{
                            color: 'red', 
                            marginTop:'-5px', 
                            marginRight: '3px',
                            fontSize: '15px',
                        }}
                    />
                    Delete
                </span>
            </Row>
            <Modal show={show} onHide={handleClose} >
                <Modal.Body className='text-center'> 
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button
                        onClick={handleClose}
                        style={{
                            width: '80px',
                            background: 'red',
                            borderColor: 'red'
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={onDeleteItem}
                        style={{
                            width: '80px',
                            background: 'green',
                            borderColor: 'green'
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteItem;