
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




const Register = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const Router = useRouter()

    const HandleUser = (e) =>{
     setUsername(e.target.value)
    }

    const HandlePassword = (e) =>{
      setPassword(e.target.value)
    }

    const HandleEmail = (e) =>{
      setEmail(e.target.value)
    }


    const handleClick = async (e) => {
        e.preventDefault();
    
        const formData = {
            username: username,
            password: password,
            email: email
        };
    
        try {
            const response = await Axios.post('http://localhost:3060/Register', formData);
            const data = response.data;
           
            
                if(data.message){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Already Registred",
                      });
                     Router.push('/Login')
                }else if(data){
                    localStorage.setItem('token',response.data.Token)
                    Swal.fire({
                        title: "Registred",
                        text: "You Registred",
                        icon: "success"
                      });
                    Router.push('/Product')
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text:"Name or Email Or Paswword Cannot be Empty"
                      });
                }
            if(response.status == 200){
                setUsername('')
                setPassword('')
                setEmail('')
            }else if(response.status == 201){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:"Name or Email Or Paswword Cannot be Empty"
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
                            <p className="text-center mt-3 lead">Register</p>
                                <MDBCardBody>
                                    <form>
                                        <MDBInput className='mb-4' type='text' id='form1Example2' label='Username' onChange={HandleUser} value={username}
                                        />
                                        <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' onChange={HandlePassword} value={password}  />
                                        <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' onChange={HandleEmail} value={email}  />
                                        <MDBBtn onClick={handleClick} block>
                                           Register
                                        </MDBBtn>
                                    </form>
                                   <p className='mt-2'>Already Registred  Please  <Link href='Login' >Login</Link>  </p> 
                                </MDBCardBody>
                               
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
};

export default Register;
