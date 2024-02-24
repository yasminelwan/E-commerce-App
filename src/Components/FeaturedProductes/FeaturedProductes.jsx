import React,{ useContext }  from 'react'

import axios from 'axios'
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function FeaturedProductes() {
    let { addToCart } = useContext(CartContext)

    async function addProduct(productId){
        let response = await addToCart(productId)
        if(response.data.status ==='success')
        {
            toast.success('product successfully added',
            {
                position: 'top-right',
            })
            
        }
        else
        {
            toast.error('error adding product')
        }
        //console.log(response);
    }
    
    function getFeaturedProductes(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let {isError , isFetching , data , isLoading} = useQuery('featuredProductes',getFeaturedProductes,{
        // cacheTime:3000,
        // refetchOnMount:false
        //staleTime:30000
        //refetchInterval:1000
    });
    console.log(data?.data.data);
    console.log("isLoading" , isLoading);
    console.log("isFeatching" , isFetching);



    return <>
        {isLoading? <div className="w-100 d-flex justify-content-center py-5">
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>:<div className="row">
        {data?.data.data.map((product) => {
            return <div className='col-md-3' key={product.id}>
                    
                        <div className='product overflow-hidden px-2 py-3 cursor-pointer'>
                            <Link to={`/productDetails/${product.id}`}>
                                <img className='w-100' src={product.imageCover} alt={product.title}/>
                                <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                                <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
                                <div className='d-flex justify-content-between mt-3'>
                                    <span>{product.price} EGP</span>
                                    <span><i className='fas fa-star rating-color mx-1'></i>{product.ratingsAverage}</span>
                                </div>
                            </Link>
                            <button onClick={() => addProduct(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>+Add to cart</button>                                         
                        </div>
                </div>
            })}      
    </div>}
    </>
}
