import React,{useContext,useEffect} from 'react';
import Header from './header';
import Body from './body';
import Footer from './footer.js';
import { UserContext } from './user.js';
import { Cart} from './cart.js';
import { Navbar } from './navbar.js';

const About = () => {

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
        <Header title='ABOUT US' />
        <center>
          <Body>
          <div style={styles.container}>
                <p style={styles.intro}>Welcome to My Cart application. 
                This application is designed to provide a seamless shopping experience for Users.</p>

                <h2 style={styles.heading}>OBJECTIVE</h2>
                <p style={styles.paragraph}>Creating a user-friendly platform where customers can easily browse, select, and purchase products. 
                Products are with detailed descriptions and user ratings </p>

                <h2 style={styles.heading}>Features</h2>
                <ul style={styles.list}>
                    <li>Browse a variety of products across different categories.</li>
                    <li>View detailed description of products.</li>
                    <li>Add and remove products from your Shopping Cart.</li>
                    <li>Proceed to checkout and complete your purchase.</li>
                </ul>

                <h2 style={styles.heading}>Contact</h2>
                <p style={styles.paragraph}>If you have any queries, feel free to reach out to :</p>
                <ul style={styles.list}>
                    <li>Email: ManasSKulkarni@philips.com</li>
                    <li>Phone: 9945401508</li>
                    <li>Address: #106, 1st C main, Manjunath nagar, Ittamadu, BSK 3rd stage, Bengaluru -85</li>
                </ul>
            </div>
          </Body>
        </center>
        <Footer />
        </>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'left',
        fontFamily: 'Arial, sans-serif'
    },
    intro: {
        fontSize: '18px',
        marginBottom: '20px'
    },
    heading: {
        fontSize: '24px',
        marginTop: '20px',
        borderBottom: '2px solid #000',
        paddingBottom: '5px'
    },
    paragraph: {
        fontSize: '16px',
        marginBottom: '20px'
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px'
    }
};

export default About;
