import React, {  useState } from 'react'
import FeaturedProductes from '../FeaturedProductes/FeaturedProductes';
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet';

export default function Home()
{
    
    return (
    <>
        <Helmet>
            <meta name='description' />
            <title>Fresh Cart Home</title>            
        </Helmet>
        
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProductes/>
    </>
    )
}