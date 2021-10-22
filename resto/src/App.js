import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Item from './components/js/Item';
import ItemSelect from './components/js/ItemSelect';
import AddItem from './components/js/AddItem';
import CartItem from './components/js/CartItem';
import './App.css';

const App = () => {

  const cart = useSelector(state => state.cart)

  return (
    <div className='main-container'>
     
      <Col className='menu-container'>
        <div className='cart-container'>
          <CartItem />
        </div>
        <div className='header'>
          <h1>Resto App</h1>
        </div>  
        <div className='sub-header'>
          <AddItem />
          <ItemSelect />
        </div>
        <div className="items-container">
          <Item /> 
        </div>
      </Col>
    <footer>
      &copy; 2021. All Rights Reserved.
    </footer>
    </div>
  );
};

export default App;