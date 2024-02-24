import { createContext } from "react";
import axios from 'axios'

export let CartContext = createContext();

export default function CartContextProvider(props){
    let headers = {
        token:localStorage.getItem('userToken')
    }

    function addToCart(productId){
        return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            productId:productId
        },
        {
            headers:headers
        }).then((response)=>response)
        .catch((error)=>error)
    }

    function getLoggedUserCart(){
        return  axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }

    function removeCartItem(productId){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,
        {
            productId:productId
        },
        {
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }

    function updateProductQuantity(productId,count){
        return axios.put('https://ecommerce.routemisr.com/api/v1/cart' ,
        {
            productId:productId
        },
        {
            count
        },
        {
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }


    return <CartContext.Provider value={{addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity}}>
        {props.children}
    </CartContext.Provider>
}