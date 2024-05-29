'use client'

import React, { useEffect,useState } from 'react'
import NavBar from '../Component/NavBar'
import { MDBContainer, MDBRow ,MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
MDBCol} from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'
import {useRouter} from 'next/navigation'
import Razorpay from 'razorpay'



const Product = () =>{
    const [data,setData] = useState([])
    const [price,setPrice] = useState(0)
    const [token,setToken] = useState('')
    const router = useRouter()


 useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then((product)=>{
        const data = product.json()
        .then((data)=>{
             setData(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    const Token = localStorage.getItem('token')
    setToken(Token)
 },[])

 const handleClick = (data) =>{
  const round =   Math.round(data + price)
   setPrice(round)
 }

 const handleCheckout = async () =>{
   const orderId = await  fetch('http://localhost:3060/Checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
        cartValue:price
        })
      })


      const data  = await orderId.json()
      console.log(data,'data')
      const OrderId = data?.orderId
      const Amount = data?.cartValue
       if(data){
        var options = {
            "key": "rzp_test_YCqko5T9VxCAy4", 
            "amount": `${Amount}`, 
            "currency": "INR",
            "name": "Naveen S Belandur pvt ltd",
            "description": "E Commerce",
            "image": "https://example.com/your_logo",
            "order_id": `${OrderId}`,
            "handler": async function (response){
                    fetch('http://localhost:3060/orderDetails', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization':  `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        razorpaypaymentid:response.razorpay_payment_id,
                        razorpayorderid:response.razorpay_order_id,
                        razorpaysignature:response.razorpay_signature,
                    })
                  })
            },
            "prefill": {
                "name": `${data?.User.username}`,
                "email": `${data?.User.email}`
            },
            "notes": {
                "address": "Belandur Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
    
        var rzp1 = await  new window.Razorpay(options);
           rzp1.open();
           rzp1.on('payment.failed', function (response){
           console.log(response.error.code);
           console.log(response.error.description);
           console.log(response.error.source);
           console.log(response.error.step);
           console.log(response.error.reason);
           console.log(response.error.metadata.order_id);
           console.log(response.error.metadata.payment_id);
    });
    
       }
 }




    return (
        <>
        <NavBar/>
        <section className='mt-5'>
            <MDBContainer>
            <MDBRow className='w-100'>
            <p className="fw-normal lead">Number of Products - {data?.length}</p>
                        {data?.map((product, index) => (

                            <MDBCol md="4" key={index} className="mb-4">
                                <MDBCard >
                                    <MDBCardImage src={product.image} style={{width:'150px'}} position='top' alt={product.title} />
                                    <MDBCardBody>
                                        <MDBCardTitle>{product.title}</MDBCardTitle>
                                        <MDBCardText>
                                            {product.description}
                                        </MDBCardText>
                                        <p>{product.price}</p>
                                        <MDBBtn  onClick={()=>handleClick(product.price)}>Add to Cart</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                      <div className='d-flex justify-content-start mt-5 mb-5'>
                     <div>
                    <p>Cart Total - {price > 100 ? price : 'Minumin Order value is more than 100'}</p>
                    {price > 100 ?   <MDBBtn onClick={handleCheckout}>Checkout</MDBBtn> : ''}
                    </div>
                    </div>
            </MDBContainer>

        </section>
        </>
    )
 

}




export default Product