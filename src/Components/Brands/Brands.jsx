import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';

export default function Brands() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function getBrands(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let {isError , isLoading ,data } = useQuery('brands', getBrands,{
        // cacheTime:3000,
        // refetchOnMount:false
        //staleTime:30000
        //refetchInterval:1000
    });
    console.log(data?.data.data);
    
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
    </div>:
    <div className="row mt-3">
    {data?.data.data.map((brand) => {
        return <div className='col-md-3' key={brand.id}>
                
                    <div className='product overflow-hidden px-2 py-3 cursor-pointer mb-3 border rounded-1 text center'>
                        
                            <img className='w-100' height={200} src={brand.image} alt={brand.title}/>
                            <span>{brand.name}</span>
                            
                            
                        
                    
                    </div>
            </div>
        })}      
    </div>}
    </>

}
