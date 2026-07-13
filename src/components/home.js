import React,{useContext,useEffect} from 'react';
import Header from './header.js'; 
import Footer from './footer.js'; 
import { Cart } from './cart.js';
import { UserContext } from './user.js';
import { Navbar } from './navbar.js';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
const { setCart } = useContext(Cart);

    useEffect(() => {
    setUser(null);
    setCart([]);
}, [setUser, setCart]);

      return (
        <>
          <Navbar />
          <Header title='HOME' />
    
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 120px)', 
            padding: '20px',
            backgroundColor: '#f4f4f4', 
            textAlign: 'center'
          }}>
            <center><h1 style={{
              color: 'black', 
              fontFamily: 'Arial, sans-serif',
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '20px 0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' 
            }}>
              Welcome to MyCart
            </h1></center>
            
            <h2 style={{
                color: '#2c3e50', 
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                margin: '10px 0',
                fontStyle: 'italic',
            }}>
                Products powered by{" "}
<a
  href="https://fakestoreapi.com/products"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: "#3498db", textDecoration: "underline" }}
>
  Fake Store API
</a>
            </h2>

            <GoogleLogin
  onSuccess={(credentialResponse) => {

      const googleUser = jwtDecode(
    credentialResponse.credential
);

console.log(googleUser);

setUser(googleUser);

navigate("/mycart/register");
  }}
  onError={() => {
    alert("Google Login failed. Please try again.");
}}
/>
          </div>
    
          <Footer />
        </>
      );
    };
    

export default Home;
