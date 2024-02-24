import React ,{useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {

    const [userMessage, setUserMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    async function submitRegister(values){
        console.log(values);
        setIsLoading(true);
        return axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then((data) =>{
            console.log(data);
            if(data.data.message  == "success"){
                //login
                setUserMessage(data.data.message);
                navigate("/login");
                setIsLoading(false)
            }
        }).catch((err)=>{
            console.log(err);
            setErrorMessage(err.response.data.message);
            setIsLoading(false)
        })

    }

    // function validate(values){
    //     let errors = {};

    //     if(!values.name)
    //     {
    //         errors.name = "name is required"
    //     }
    //     else if(values.name.length < 3)
    //     {
    //         errors.name ="name minLength is 3"
    //     }
    //     else if(values.name.length > 10)
    //     {
    //         errors.name = "name max is 10"
    //     }
        

    //     return errors;
    // }


    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    let validationSchema = Yup.object({
        name : Yup.string().min(3,'name minLength is 3').max(10,'name maxLength is 10').required('name is required'),
        email : Yup.string().email('email is invalid').required('email is required'),
        phone : Yup.string().matches(phoneRegExp , 'phone is invalid').required('phone is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password srart with uppercase').required('password is required'),
        rePassword : Yup.string().oneOf([Yup.ref('password')] ,'password and rePassword do not match').required('rePassword is required')
    })

    let formik = useFormik ({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''
            
        },validationSchema,
        onSubmit:submitRegister
    })

    return <>

        <div className='w-75 mx-auto py-5'>
            <h3>Register Now</h3>

            {userMessage ? <div className='alert alert-success'>{userMessage}</div> : ""}
            {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ""}

            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='name'>Name :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-4' name='name' id='name' type='text'/>
                {formik.errors.name && formik.touched.name ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div> : ""}
                

                <label htmlFor='email'>Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-4' name='email' id='email' type='email'/>
                {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div> : ""}


                <label htmlFor='phone'>Phone :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-4' name='phone' id='phone' type='tel'/>
                {formik.errors.phone && formik.touched.phone ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div> : ""}

                <label htmlFor='password'>Password : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-4' name='password' id='password' type='password'/>
                {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div> : ""}

                <label htmlFor='rePassword'>RePassword :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-4' name='rePassword' id='rePassword' type='password'/>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div> : ""}
                
                {isLoading ? <button type='submit' className='btn bg-main text-white mt-3'> <i className='fa fa-spin fa-spinner'></i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3'>Register</button>}
                
                
            </form>
        
        </div>
        
    </>

}
