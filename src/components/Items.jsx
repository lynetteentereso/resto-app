import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import OrderItem from './OrderItem';
import { v4 as uuid } from 'uuid';

const Items = () => {
    const filteredItems = useSelector(state => state.filteredItems);
    return (
        <Container className='items-wrapper d-flex justify-content-center align-items-center'>
            {   
                filteredItems.length === 0 
                ? <p style={{color: 'gray'}}>There are no items under this category.</p>
                : filteredItems
                .map( item => 
                    <React.Fragment key={uuid()}>
                        <Card 
                            className='item-card'
                            style={{ 
                                width: '18rem',
                                height: '27rem',
                                margin: '10px',
                                borderColor: '#592005'
                            }}
                        >
                            <Card.Body 
                                className='d-flex justify-content-between mt-2' 
                                style={{
                                    color: 'gray',
                                    fontSize: '13px'
                                }}
                            >
                                <span>
                                    <EditItem id={item.id} />
                                </span>
                                <span>
                                    <DeleteItem item={item} />
                                </span>                                
                            </Card.Body>
                            <Card.Img 
                                className='item-image'
                                variant="top" 
                                src={item.image} 
                                alt={item.name} 
                                style={{
                                    width:'180px',
                                    height: '180px',
                                    margin: '-5px auto 10px auto'                               
                                }}
                            />
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-between'>
                                    <h3>{item.name}</h3>
                                    <h4 style={{marginTop: '3px'}}>P{item.price}</h4>
                                </Card.Title>
                                <Card.Text
                                    style={{
                                        color: 'lightgray',
                                        marginTop: '-15px',
                                        fontSize: '13px'
                                    }}
                                >
                                    {item.category}
                                </Card.Text>
                                 <OrderItem item={item}/>                            
                            </Card.Body>
                        </Card>
                    </React.Fragment>
                )
            }
        </Container>
    );
};

export default Items;