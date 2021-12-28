const initialState = {
    items: [
        {
            id: 1,
            name: 'Burger',
            price: 50,
            category: 'Food',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640460565/Anonymous-burger_hhiia1.svg'
          },
          {
            id: 2,
            name: 'Pizza',
            price: 100,
            category: 'Food',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640460565/pizza_4_stagioni_archite_01_lm6dxe.svg'
          },
          {
            id: 3,
            name: 'Fries',
            price: 25,
            category: 'Food',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640460565/french-fries-juliane-kr-r_b8o91p.svg'
          },
          {
            id: 4,
            name: 'Coffee',
            price: 35,
            category: 'Beverage',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640470256/cappuchino_bidsrr.svg'
          },
          {
            id: 5,
            name: 'Iced Tea',
            price: 45,
            category: 'Beverage',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640460565/1548611532_cxf4ad.svg'
          },
          {
            id: 6,
            name: 'Hot Tea',
            price: 45,
            category: 'Beverage',
            image: 'https://res.cloudinary.com/do6mdym2e/image/upload/v1640460565/teacup-_kcy4vj.svg'
          }  
    ],
    categories:['All','Food', 'Beverage', 'Dessert'],
    filter:'All',
    filteredItems: [],
    cart:[],
    cartQuantity: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ITEM_FILTER':
          return{
              ...state,
              filter: action.payload,
              filteredItems: action.payload === "All" 
                ? [...state.items] 
                : [...state.items.filter(item => item.category === action.payload)] 
          };
        case 'ADD_ITEM':
          return{
            ...state,
            items: [...state.items, action.payload],
            filteredItems: action.payload === "All" 
                ? [...state.items] 
                : [...state.items.filter(item => item.category === action.payload)] 
          };
        case 'EDIT_ITEM':
            return{
              ...state,
              items: state.items.map(item =>
                item.id === action.payload.id
                ? {...item, name:action.payload.name, price: action.payload.price, category: action.payload.category, image: action.payload.image}  
                : item),
              cart: state.cart.map( cartItem =>
                cartItem.id === action.payload.id
                ? {...cartItem, name: action.payload.name, price: action.payload.price, category: action.payload.category, image: action.payload.image}
                : cartItem
                )  
            }
        case 'DELETE_ITEM':
          const deletedItemQty = state.cart.filter(cartItem => cartItem.id === action.payload.id).map(cartItem => {return cartItem.quantity})
          return { 
            ...state,
            items: state.items.filter(item => item.id !== action.payload.id),
            cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
            cartQuantity: state.cartQuantity - deletedItemQty  
        }
        case 'ADD_TO_CART':
            // Check if the new cart item is already added to cart
            const inCart = state.cart.find(cartItem => cartItem.id === action.payload.id ? true : false); 
            return { 
                ...state, 
                cart: inCart 
                    ? state.cart.map( cartItem => 
                        cartItem.id === action.payload.id 
                            ? {...cartItem, quantity: cartItem.quantity + 1 } 
                            : cartItem
                            ) 
                    : [...state.cart, {...action.payload, quantity: 1}],
                cartQuantity: state.cartQuantity + 1
            };
            case 'INCREASE_QUANTITY':
              return{
                  ...state,
                  cart: state.cart.map( cartItem => 
                      cartItem.id === action.payload
                      ? {...cartItem, quantity: cartItem.quantity + 1 } 
                      : cartItem
                      ),
                  cartQuantity: state.cartQuantity + 1
              };
          case 'DECREASE_QUANTITY':
              return{
                  ...state,
                  cart: state.cart.map( cartItem =>
                      cartItem.id === action.payload && cartItem.quantity > 1
                      ? {...cartItem, quantity: cartItem.quantity - 1}
                      : cartItem
                      ),
                  cartQuantity: state.cartQuantity - 1
              }
          case 'REMOVE_FROM_CART':
            const itemQty = state.cart.filter(cartItem => cartItem.id === action.payload.id).map(cartItem => {return cartItem.quantity})
              return { 
                  ...state,
                  cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
                  cartQuantity: state.cartQuantity - itemQty  
              }
        default:
            return state;
    }
}

export default reducer;