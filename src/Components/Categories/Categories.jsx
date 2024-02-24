import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';






export default function Categories() {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let {isError , isLoading ,data } = useQuery('categories', getCategories,{
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
</div>:<div className="row mt-3">
    {data?.data.data.map((category) => {
        return <div className='col-md-4' key={category.id}>
                
                    <div className='product overflow-hidden px-2 py-3 cursor-pointer'>
                        
                            <img className='w-100' height={400} src={category.image} alt={category.title}/>
                            <span className='text-success h3 text-center fw-bolder'>{category.name}</span>
                            
                            
                        
                    
                    </div>
            </div>
        })}      
</div>}
        
    </>

}
