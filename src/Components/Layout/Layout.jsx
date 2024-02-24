import React, { useContext, useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";


export default function Layout() {
    let {setUserToken} = useContext (UserContext);

    useEffect(() => {
        if(localStorage.getItem('userToken') !== null){
            setUserToken(localStorage.getItem('userToken'))
        }
    }, [])
    return <>
    <Navbar/>
        <div className='container'>            
            <Outlet></Outlet>           
        </div>

        <div>
            
            <Offline>
                <div className='network'>
                    <i className='fsa fa-wifi'>You are offline (surprise!)</i>
                </div>
            </Offline>
        </div>

    </>
        
    
}
