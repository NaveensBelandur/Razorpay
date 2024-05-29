
'use client';

import React from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import {useState} from 'react'
import Axios from 'axios'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Swal from 'sweetalert2';




const Login = () => {
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const Router = useRouter()



    const HandlePassword = (e) =>{
      setPassword(e.target.value)
    }

    const HandleEmail = (e) =>{
      setEmail(e.target.value)
    }


    const handleClick = async (e) => {
        e.preventDefault();
    
        const formData = {
            password: password,
            email: email
        };
        try {
            const response = await Axios.post('http://localhost:3060/Login', formData);
            const data = response.data;
                if(data){
                    localStorage.setItem('token',response.data.Token)
                    Swal.fire({
                        title: "Logged In",
                        text: "You have Logged in Succesfully",
                        icon: "success"
                      });
                    Router.push('/Product')
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Login Error",    
                      });
                }
            if(response.status == 200){
                setPassword('')
                setEmail('')
            }else if(response.status == 201){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Login Error",
                  });
            }
           
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    
    
    return (
        <>
            <section style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MDBContainer className='w-25'>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard>
                            <p className="text-center mt-3 lead">Login</p>
                                <MDBCardBody>
                                    <form>
                                        <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' onChange={HandleEmail} value={email}  />
                                        <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' onChange={HandlePassword} value={password}  />
                                        <MDBBtn onClick={handleClick} block>
                                          Login
                                        </MDBBtn>
                                    </form>
                                   <p className='mt-2'>Register Here  <Link href='Register' >Register</Link>  </p> 
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
};

export default Login;
