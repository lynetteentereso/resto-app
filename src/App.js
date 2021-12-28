import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Badge, Container, Row, Col, Offcanvas } from 'react-bootstrap';
import ItemFilter from './components/ItemFilter';
import Items from './components/Items';
import AddItem from './components/AddItem';
import Cart from './components/Cart';
import { ImSpoonKnife } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import './App.css';

const App = () => {
  const cartQuantity = useSelector (state => state.cartQuantity);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    document.title = 'La Kusina';
    dispatch({type: 'ITEM_FILTER', payload: 'All'});
  }, [dispatch]);

  return (
    <div>
      <Navbar bg='light' className='sticky-top mb-3'>
        <Nav style={{color: '#592005'}}>
          <span>
            <h1 style={{marginLeft:'10px'}}>
              <ImSpoonKnife style={{fontSize:'20px', marginTop:'-5px'}}/> 
              La Kusina
            </h1>
          </span>
          <span
            onClick={handleShow}
            style={{
              marginRight:'5px',
              cursor: 'pointer'
            }}
          >
            <FaShoppingCart 
              style={{
                fontSize:'25px', 
                marginTop:'15px',
                position: 'absolute',
                right: '25px',
                top: '3px',
                zIndex:'10'
              }}
            />
            <Badge  
              bg='light'
              text='dark'
              style={{
                position: 'absolute',
                right: '3px',
                top: '10px'
              }}
            >
              {cartQuantity}
            </Badge>
          </span>

          {/* OFFCANVAS */}
          
          <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Cart />
            </Offcanvas.Body>
          </Offcanvas>

        </Nav>
      </Navbar>
      <Container className='container-fluid'>
        <Row>
          <Col>
            <AddItem />
          </Col>
          <Col>
          <ItemFilter />
          </Col>
        </Row>
      </Container>
      <Items />
    </div>
  );
};

export default App;