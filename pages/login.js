import React, { useState } from 'react'
import * as yup from 'yup'
import {useRouter} from "next/router";
import { Button, TextField } from '@mui/material';
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import { signIn } from 'next-auth/react';
import { LoaderBar } from '../components';
import { useAuth } from '../context/user';


const LoginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})



 const LoginScreen = () => {
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            submit(values)
        },
    });

    const authContext = useAuth();
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState('');

    const submit = async (formData) => {
        setProcessing(true)
        const result = await signIn('credentials', {
            redirect: false,
             ...formData,

        });
        if(result.status==200){
            authContext.login(result)
            setError(false)
        }else{
            setError("*Invalid username and/or password")
        }
        setProcessing(false)

    }

    return (
        <div className="container main-login">
            <div className='auth-screen'>
                <h2 className='mt-0'>
                    Login
                </h2>
                <form onSubmit={formik.handleSubmit} className="w-100">
                    <div className="d-flex flex-column w-100">
                        <div className='my-3 w-100'>
                            <TextField
                                label="Username"
                                name="username"
                                placeholder="Username"
                                error={formik.errors?.username && Boolean(formik.errors.username)}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="w-100"
                            />
                            {formik.touched.username && Boolean(formik.errors.username) && <small className="text-danger">{formik.errors?.username}</small>}
                        </div><div className="w-100 mt-2">
                            <TextField
                                label="Password"
                                name="password"
                                placeholder="Password"
                                error={formik.errors?.password && Boolean(formik.errors.password)}
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="w-100"
                            />
                            { formik.touched.password && Boolean(formik.errors.password) && <small className="text-danger">{formik.errors?.password}</small>}
                      </div>
                      <small className='text-danger'>{error}</small>
                        <Button variant='contained' className="mt-3" type="submit">Login{processing && <LoaderBar/>}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen