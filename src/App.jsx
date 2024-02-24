import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Productes   from './Components/Productes/Productes'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'





let routers = createBrowserRouter([
  {path:'/',element:<Layout/> ,children:[
    {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'/products',element:<ProtectedRoute><Productes/></ProtectedRoute>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'/productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*',element:<Notfound/>}
    
  ]}
])




export default function App() {
  return <CartContextProvider>
    <UserContextProvider>

    <RouterProvider router={routers}></RouterProvider> 

  </UserContextProvider>
  <Toaster/>
  </CartContextProvider>

}