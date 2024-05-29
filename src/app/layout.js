import 'mdb-react-ui-kit/dist/css/mdb.min.css';



export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <body>{children}
      <script src='https://checkout.razorpay.com/v1/checkout.js'></script>
      </body>
    
    </html>
     </>
  ) 
}
