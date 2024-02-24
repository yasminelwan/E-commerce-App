import React,{useContext, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {
    let {setUserToken}=useContext(UserContext)

    const [userMessage, setUserMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    async function submitLogin(values){
        console.log(values);
        setIsLoading(true);
        return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then((data) =>{
            console.log(data);
            if(data.data.message  === "success"){
                //login
                setUserMessage(data.data.message);
                setIsLoading(false);
                localStorage.setItem('userToken',data.data.token);
                setUserToken(data.data.token)
                navigate("/");
                
            }
        }).catch((err)=>{
            console.log(err);
            setErrorMessage(err.response.data.message);
            setIsLoading(false)
        })
    }

    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    let validationSchema = Yup.object({       
        email : Yup.string().email('email is invalid').required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password srart with uppercase').required('password is required')       
    })

    let formik = useFormik ({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
            
        },validationSchema,
        onSubmit:submitLogin
    })


    return <>
    <div className='w-75 mx-auto py-5'>
    <h3>Login Now</h3>

    {userMessage ? <div className='alert alert-success'>{userMessage}</div> : ""}
    {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ""}

    <form onSubmit={formik.handleSubmit}>

        <label htmlFor='email'>Email :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-4' name='email' id='email' type='email'/>
        {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div> : ""}

        <label htmlFor='password'>Password : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-4' name='password' id='password' type='password'/>
        {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div> : ""}

        {isLoading ? <button type='submit' className='btn bg-main text-white mt-3 mx-2'> <i className='fa fa-spin fa-spinner'></i> </button> :
        <>
            <div className='d-flex align-items-center'>
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3'>Register</button>
            <Link className='btn' to ={'/register'}>Register Now</Link>
            </div>

        </>

    }

        
        
        
        
    </form>

</div>

    </>

}
