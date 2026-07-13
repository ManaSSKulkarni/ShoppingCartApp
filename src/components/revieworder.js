import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from './cart.js';
import Header from './header.js';
import Footer from './footer.js';

const ReviewOrder = () => {

    const { cart, setCart } = useContext(Cart);

    const navigate = useNavigate();

    const handleOrderAgain = () => {
        navigate('/mycart/register/order');
    };

    const handlePlaceOrder = () => {
        navigate('/mycart/register/order/review/orderplaced');
    };

    const handleRemove = (productId) => {

        const existing = cart.find(item => item.product.id === productId);

        if (!existing) return;

        if (existing.quantity === 1) {

            setCart(
                cart.filter(item => item.product.id !== productId)
            );

        } else {

            setCart(
                cart.map(item =>
                    item.product.id === productId
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
            );

        }

    };

    const totalCost = cart.reduce(
    (sum, item) =>
        sum + item.product.price * item.quantity,
    0
);

    return (
        <>
            <Header title="REVIEW" />

            <div style={styles.container}>

                <h1 style={styles.heading}>
                    Review Order
                </h1>

                <div style={styles.buttonContainer}>

                    <button
                        onClick={handleOrderAgain}
                        onMouseOver={(e) =>
                            e.currentTarget.style.backgroundColor =
                                styles.buttonHover.backgroundColor
                        }
                        onMouseOut={(e) =>
                            e.currentTarget.style.backgroundColor =
                                styles.button.backgroundColor
                        }
                        style={styles.button}
                    >
                        Edit Order
                    </button>

                    <button
                        onClick={handlePlaceOrder}
                        onMouseOver={(e) =>
                            e.currentTarget.style.backgroundColor =
                                styles.buttonHover.backgroundColor
                        }
                        onMouseOut={(e) =>
                            e.currentTarget.style.backgroundColor =
                                styles.button.backgroundColor
                        }
                        style={styles.button}
                    >
                        Place Order
                    </button>

                </div>

                {cart.length === 0 ? (

                    <div style={styles.emptyCart}>
                        <h2>No products in the cart.</h2>
                    </div>

                ) : (

                    <div style={styles.cartItems}>

                        {cart.map(item => {

                            const product = item.product;

                            return (

                                <div
                                    key={product.id}
                                    style={styles.productCard}
                                >

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        style={styles.image}
                                    />

                                    <h3 style={styles.productTitle}>
                                        {product.title}
                                    </h3>

                                    <p style={styles.productCategory}>
                                        Category : {product.category}
                                    </p>

                                    <p style={styles.productPrice}>
                                        Rs {product.price}
                                    </p>

                                    <p>
                                        Quantity : {item.quantity}
                                    </p>

                                    <button
                                        onClick={() =>
                                            handleRemove(product.id)
                                        }
                                        onMouseOver={(e) =>
                                            e.currentTarget.style.backgroundColor =
                                                styles.pbuttonHover.backgroundColor
                                        }
                                        onMouseOut={(e) =>
                                            e.currentTarget.style.backgroundColor =
                                                styles.pbutton.backgroundColor
                                        }
                                        style={styles.pbutton}
                                    >
                                        Remove
                                    </button>


                                </div>

                            );

                        })}

                        <h2
    style={{
        textAlign: "right",
        marginTop: "20px",
        color: "darkblue"
    }}
>
    Grand Total : ₹ {totalCost.toFixed(2)}
</h2>

                    </div>

                )}

            </div>

            <Footer />

        </>
    );

};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: 'calc(100vh - 60px)',
    },

    heading: {
        textAlign: 'center',
        color: 'black',
        marginBottom: '20px',
        fontSize: '28px',
        fontFamily: 'Arial, sans-serif',
    },

    emptyCart: {
        textAlign: 'center',
        marginTop: '50px',
        color: '#666',
        border: '2px dashed #ccc',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },

    cartItems: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        marginTop: '20px',
    },

    productCard: {
        padding: '15px',
        border: '2px solid #0056b3',
        borderRadius: '8px',
        backgroundColor: 'beige',
        width: '300px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },

    image: {
        maxWidth: '100%',
        height: '200px',
        objectFit: 'contain',
        marginBottom: '10px',
    },

    productTitle: {
        fontSize: '18px',
        margin: '10px 0',
        color: '#333',
    },

    productCategory: {
        color: '#777',
    },

    productPrice: {
        fontWeight: 'bold',
        color: 'black',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },

    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'darkblue',
        border: 'none',
        transition: '0.3s',
    },

    buttonHover: {
        backgroundColor: '#0056b3',
    },

    pbutton: {
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'darkgreen',
        border: 'none',
        transition: '0.3s',
    },

    pbuttonHover: {
        backgroundColor: 'gray',
    },

};

export default ReviewOrder;