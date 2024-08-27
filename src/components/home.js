import React,{useContext,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Header from './header.js'; 
import Footer from './footer.js'; 
import { Cart } from './cart.js';
import { UserContext } from './user.js';
import { Navbar } from './navbar.js';


const Home = () => {

    const {setUser}=useContext(UserContext)
    useEffect(() => {
        setUser(null);
      }, [setUser]);

    const {setCart} = useContext(Cart)
    useEffect(() => {
        setCart([]);
      }, [setCart]);

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
                Products API :  
                <a 
                    href='https://fakestoreapi.com/products' 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    style={{ color: '#3498db', textDecoration: 'underline' }}
                >
                  https://fakestoreapi.com/products
                </a>
            </h2>

            <NavLink 
              to='/mycart/register'
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                marginTop: '20px',
                backgroundColor: 'black', 
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '4px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              }}
              >
                Order
              </NavLink>
          </div>
    
          <Footer />
        </>
      );
    };
    

export default Home;
