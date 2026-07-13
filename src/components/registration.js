import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { UserContext } from './user';
import { Navbar } from './navbar';
import axios from "axios";
import { useEffect } from "react";



    const RegistrationForm = () => {

        console.log("Registration Rendered");

        const [phone, setPhone] = useState('');
        const [loading, setLoading] = useState(true);

        const { user, setUser } = useContext(UserContext);

        const navigate = useNavigate();

        useEffect(() => {

        const checkUser = async () => {

        try {

            const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/check-user`,
    {
        email: user?.email
    }
);

console.log("Backend Response:", response.data);

if(response.data.exists){

    console.log("DB User:", response.data.user);

    setUser(response.data.user);

    navigate("/mycart/register/order");
}

        } catch(err){
            console.log(err);
        } finally {
            setLoading(false);
        }
        };

        if(user?.email){
        checkUser();
        }

        }, [user?.email, navigate, setUser]);

        const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("1. Submit clicked");

        console.log(user);

        console.log(phone);

        try {

        console.log("2. Calling API");

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/users`,
            {
                name: user.name,
                email: user.email,
                phone
            }
        );

        console.log("3. API Success");

        console.log(response.data);

        setUser(response.data);

        navigate('/mycart/register/order');

        } catch(err){

        console.log("4. API Error");

        console.log(err);

        }
        };

        if (loading) {
        return <h2>Checking User...</h2>;
        }


        const styles = {
            container: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            },
            registerContainer: {
            background: 'lightblue',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            maxWidth: '500px',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'center',
            },
            header: {
            color: 'darkblue',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '36px',
            marginBottom: '20px',
            },
            formGroup: {
            marginBottom: '15px',
            textAlign: 'left',
            },
            label: {
            display: 'block',
            color: 'black',
            fontSize: '16px',
            marginBottom: '5px',
            },
            formInput: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            boxSizing: 'border-box',
            },
            submitButton: {
                backgroundColor: 'black',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 20px',
                fontSize: '18px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px',
                transition: 'all 0.3s ease'
            },
        };

        return (
        <>
            <Navbar />
            <Header title='REGISTRATION' />
            <div style={styles.container}>
                <div style={styles.registerContainer}>
                    <h1 style={styles.header}>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name:</label>
                                <input
                                    type="text"
                                    value={user?.name || ''}
                                    disabled
                                    style={styles.formInput}
                                />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email:</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    style={styles.formInput}
                                />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                style={styles.formInput}
                            />
                        </div>
                        <button
                            type="submit"
                            style={styles.submitButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#444";
                                e.target.style.transform = "scale(1.03)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "black";
                                e.target.style.transform = "scale(1)";
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegistrationForm;
