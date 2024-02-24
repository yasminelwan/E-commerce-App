import React, { useContext, useEffect,useState } from 'react'
import { CartContext} from '../../Context/CartContext'


export default function Cart() {
    let {getLoggedUserCart , removeCartItem , updateProductQuantity} = useContext(CartContext);

    const [cartDetails, setCartDetails] = useState(null)

    async function updateCount(id,count){
        let {data} = await updateProductQuantity(id,count);
        setCartDetails(data)
    }

    async function removeCart(id){
        let {data} = await removeCartItem(id);
        setCartDetails(data)
    }

    async function getCart(){
        let {data} = await getLoggedUserCart();
        setCartDetails(data)
    }

    useEffect(()=>{
        getCart();
    } ,[])
    
    return <>
        {cartDetails? <div className='w-75 bg-main-light p-3 my-3 mx-auto '>
            <h3>Shopping Cart</h3>
            <h4 className='h6  text-success fw-bolder'>Total number of items: {cartDetails.numOfCartItems}</h4>
            <h4 className='h6  text-success fw-bolder mb-4'>Total Cart Price: {cartDetails.data.totalCartPrice} EGP</h4>
            
            {cartDetails.data.products?.map((product) => <div key={product.product.id}  className='row border-bottom py-2 px-2'>
                <div className='col-md-2'>
                    <img className='w-100' src={product.product.imageCover} alt=""/>
                </div>
                <div className='col-md-10'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h3 className='h6'>{product.product.title.split(" ").slice(0,3).join(" ")}</h3>
                            <h6 className="text-main">Price: {product.price} EGP</h6>
                        </div>

                        <div>
                            <button onClick={() => updateCount(product.product.id, product.count + 1 )} className='btn border border-success p-1'>+</button>
                            <span className='mx-2'>{product.count}</span>
                            <button onClick={() => updateCount(product.product.id, product.count - 1 )} className='btn border border-success p-1'>-</button>
                        
                        </div>

                    </div>
                    <button onClick={()=>removeCart(product.product.id)} className="btn p-0"><i className="text-danger pe-2 font-sm fas fa-trash-can"></i>Remove</button>
                
                </div>
            </div>
            )}
            </div>
        :<h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>}
    </>

}
