import React from 'react'
import Slider from 'react-slick';
import slide1 from '../../Assest/images/slider-image-1.jpeg';
import slide2 from '../../Assest/images/slider-image-2.jpeg';
import slide3 from '../../Assest/images/slider-image-3.jpeg';
import blog1 from '../../Assest/images/blog-img-1.jpeg';
import blog2 from '../../Assest/images/grocery-banner-2.jpeg';


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
    };

    return <>
    <div className='row py-5 gx-0'>
        <div className='col-md-9'>
            <Slider {...settings}>
                <img height={400} className='w-100' src={slide1} alt='product'/>
                <img height={400} className='w-100' src={slide2} alt='product'/>
                <img height={400} className='w-100' src={slide3} alt='product'/>
            </Slider>
        </div>
        <div className='col-md-3'>
            
                <img height={200} className='w-100' src={blog1} alt='product'/>
                <img height={200} className='w-100' src={blog2} alt='product'/>
                
            
        </div>  
    </div>
    </>

}
