import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';





export default function ProductDetails() {
    let params = useParams();
    //console.log(params.id);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    let {isError , isLoading ,data } = useQuery('productDetails',()=> getProductDetails(params.id));
    console.log(data?.data.data);
    // const [productDetails, setpProductDetails] = useState(initialState)
    // async function getProductDetails(id){
    //     let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    //     setpProductDetails(data)
    // }
    // useEffect(()=>{
    //     getProductDetails(params.id)
    // },[])
    return <>
        {data?.data.data?<div className='row align-items-center py-2'>

        <Helmet>
            <meta name='description' />
            <title>{data?.data.data.title}</title>
            
        </Helmet>

            <div className='col-md-4'>
                {/*<img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />*/}
                <Slider {...settings}>                   
                    {data?.data.data.images.map((el)=> <img src={el} className='w-100'/>
                    )}    
                </Slider>
            </div>
            <div className='col-md-8'>
                <h2 className='h5'>{data?.data.data.title}</h2>       
                <p>{data?.data.data.description}</p>

                <h6 className='text-main'>{data?.data.data.category?.name}</h6>
                

                <div className='d-flex justify-content-between mt-3'>
                    <h6 className='text-main'> Price:{data?.data.data.price} EGP</h6>
                    <span> <i className='fas fa-star rating-color '></i> {data?.data.data.ratingsAverage}</span>
                </div>
                <button className='btn bg-main text-white w-100 mt-3'>+ Add to cart</button>

            </div>
        </div> :""}
        
    </>

}
