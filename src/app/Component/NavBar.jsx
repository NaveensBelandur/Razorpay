'use client'
import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,

 
  } from 'mdb-react-ui-kit';
  import { IoIosLogOut } from "react-icons/io";
  import { useRouter } from 'next/navigation';
  import Swal from 'sweetalert2';

const NavBar = () =>{
  const Router  = useRouter()

  const handleLogout = () =>{
    localStorage.clear()
    Router.push('/Register')
    Swal.fire({
      title: "Logged Out",
      text: "You Have Logged Out SuccesFully",
      icon: "success"
    });
  }
    return (
        <>
   <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Product card</MDBNavbarBrand>
        <IoIosLogOut size={30} style={{cursor:'pointer'}} onClick={handleLogout}/>
 
      </MDBContainer>
    </MDBNavbar>
        </>
    )
}





export default  NavBar