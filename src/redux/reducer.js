const initialState = {
    items: [
        {
            id: 1,
            name: "Burger",
            price: 50,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046784.svg"
          },
          {
            id: 2,
            name: "Pizza",
            price: 100,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046771.svg"
          },
          {
            id: 3,
            name: "Fries",
            price: 25,
            category: "Food",
            image: "https://image.flaticon.com/icons/svg/1046/1046786.svg"
          },
          {
            id: 4,
            name: "Coffee",
            price: 35,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046785.svg"
          },
          {
            id: 5,
            name: "Iced Tea",
            price: 45,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046782.svg"
          },
          {
            id: 6,
            name: "Hot Tea 2",
            price: 45,
            category: "Drink",
            image: "https://image.flaticon.com/icons/svg/1046/1046792.svg"
          }  
    ],
    categories:[
        {value:'All Categories'},
        {value:'Food'},
        {value:'Drink'},
        {value:'Dessert'}
    ],
    cart:[],   
    selectedCategory: 'All Categories'
}

const reducer = ( state=initialState, action ) => {
    
    switch(action.type){
        case 'ITEM_SELECT':
            return { 
                ...state, 
                selectedCategory: action.payload
            };
        case 'ADD_ITEM':
            return { 
                ...state, 
                items: [...state.items, action.payload]
            };
        case 'ADD_TO_CART':
            const inCart = state.cart.find(cartItem => cartItem.id === action.payload.id ? true : false); // Check if the new cart item is already added to cart
        
            return { 
                ...state, 
                cart: inCart 
                    ? state.cart.map( cartItem => 
                        cartItem.id === action.payload.id 
                            ? {...cartItem, quantity: cartItem.quantity + 1 } 
                            : cartItem
                            ) 
                    : [...state.cart, {...action.payload, quantity: 1}]
            };
        case 'DELETE_ITEM':
            return { 
                ...state,
                items: state.items.filter(item => item.id !== action.payload), cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
            }
        case 'EDIT_ITEM':
            return {
                ...state,
                items: state.items.map( item => 
                    item.id === action.payload.id
                    ? {...item, name: action.payload.name, price: action.payload.price, category: action.payload.category, image: action.payload.image}
                    : item),
                cart: state.cart.map( cartItem =>
                    cartItem.id === action.payload.id
                    ? {...cartItem, name: action.payload.name, price: action.payload.price, category: action.payload.category, image: action.payload.image}
                    : cartItem
                    )                   
            }  
        case 'INCREASE_QUANTITY':
            return{
                ...state,
                cart: state.cart.map( cartItem => 
                    cartItem.id === action.payload
                    ? {...cartItem, quantity: cartItem.quantity + 1 } 
                    : cartItem
                    )
            }
        case 'DECREASE_QUANTITY':
            return{
                ...state,
                cart: state.cart.map( cartItem =>
                    cartItem.id === action.payload && cartItem.quantity > 1
                    ? {...cartItem, quantity: cartItem.quantity - 1}
                    : cartItem
                    )
            }
        case 'REMOVE_FROM_CART':
            return { 
                ...state,
                cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
            }

        default:
            return state;
    }
};

export default reducer;