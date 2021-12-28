import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const ItemSelect = () => {
    
    const categories = useSelector(state => state.categories);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const onSelectCategory = (e) => {
        dispatch({type:'ITEM_FILTER', payload: e.target.value});
    }
    return (
        <div>
            <Form>   
                <Form.Group>
                    <h6 className='category'>
                        Category:
                    </h6>
                    <Form.Select 
                        onChange={onSelectCategory}
                        className='select-form' 
                        value={filter}  
                        aria-label='Select Category'
                        style={{
                            width: '115px',
                        }}  
                    >
                        {
                            categories.map(category => (
                                <option 
                                    key={category} 
                                    className='selection' 
                                    value={category}                                   
                                    style={{fontSize: '12px'}}
                                >
                                    {category}
                                </option>
                                )  
                            )    
                        }                       
                    </Form.Select> 
                </Form.Group>
            </Form>
        </div>
    );
};

export default ItemSelect;