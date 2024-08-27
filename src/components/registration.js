import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { UserContext } from './user';
import { Navbar } from './navbar';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { setUser } = useContext(UserContext);
    setUser(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = {
            name,
            email,
            phone
        };

        setUser(userDetails);
        console.log(userDetails);
        alert(`Welcome ${userDetails.name}!`);

        navigate('/mycart/register/order');
    };

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
            transition: 'background-color 0.3s ease',
            width: '100%',
            marginTop: '10px',
        },
        submitButtonHover: {
            backgroundColor: 'gray',
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={styles.formInput}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
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
