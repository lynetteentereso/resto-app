import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col } from "react-bootstrap";
import '../css/ItemSelect.css'

const ItemSelect = () => {

        const categories = useSelector(state => state.categories);
        const selectedCategory = useSelector(state => state.selectedCategory);
        
        const dispatch = useDispatch();

        const onChangeHandler = (e) => {
            e.preventDefault();
            let newSelectedCategory = e.target.value;
            dispatch( {type: 'ITEM_SELECT', payload: newSelectedCategory} );
        }

    return (
        <div className='item-select'>
            <Form className='my-filter'>
               
                <Row>               
                    <Col>
                        <Form.Control className='select-form' value={selectedCategory} onChange={onChangeHandler} as='select' size='md' lg={2}>
                            {
                                categories.map(category => (
                                    <option key={Math.floor(Math.random() * 1000000000)} className='selection' value={category.value}>{category.value}</option>
                                 )  
                                )    
                            }
                          
                        </Form.Control>
                    </Col>
                </Row>   
                        
                </Form>
        </div>
    );
};

export default ItemSelect;
