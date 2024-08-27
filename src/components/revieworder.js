import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from './cart.js';
import Header from './header.js'; 
import Footer from './footer.js'; 

const ReviewOrder = () => {
  const { cart,setCart } = useContext(Cart);

  const navigate = useNavigate();
  const handleOrderAgain = () => {
    navigate('/mycart/register/order');
  };

  const handlePlaceOrder = () => {
    navigate('/mycart/register/order/review/orderplaced');
  };

  const handleRemove = (productId) => {
    const cartcopy = [...cart];
    const pindex = cartcopy.findIndex(p => p.id === productId);
    if (pindex !== -1) {
      cartcopy.splice(pindex, 1); 
      setCart(cartcopy);
    }
  };

  const getProductCounts = (cart) => {
    const counts = {};
    cart.forEach(product => {
      counts[product.id] = (counts[product.id] || 0) + 1;
    });
    return counts;
  };
  const productCounts = getProductCounts(cart);


  return (
    <>
      <Header title='REVIEW' />
      <div style={styles.container}>
        <h1 style={styles.heading}>Review Order</h1>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleOrderAgain}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            style={styles.button}>Edit Order</button>

          <button
            onClick={handlePlaceOrder}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            style={styles.button}>Place Order</button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyCart}>
            <h2>No products in the cart.</h2>
          </div>
        ) : (
          <div style={styles.cartItems}>
            {Object.keys(productCounts).map(productId => {
              const product = cart.find(p => p.id === parseInt(productId));
              return (
                <div key={productId} style={styles.productCard}>
                  <img src={product.image} alt={product.title} style={styles.image} />
                  <h3 style={styles.productTitle}>{product.title}</h3>
                  <p style={styles.productCategory}>Category: {product.category}</p>
                  <p style={styles.productPrice}>Rs {product.price}</p>
                  <p style={styles.productQuantity}>Quantity: {productCounts[productId]}</p>

                  <button
                    onClick={() => handleRemove(product.id)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.pbuttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.pbutton.backgroundColor}
                    style={styles.pbutton}>Remove</button>
                </div>
              );
            })}
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  pbutton: {
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent', 
    color: 'white',
    backgroundColor: 'darkgreen',
    outline: 'none',
    margin: '0 10px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  pbuttonHover:{
    backgroundColor: 'gray',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
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
    alignItems: 'center',
    padding: '10px 20px',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    border: '2px solid transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'darkblue',
    transition: 'background-color 0.3s, border-color 0.3s',
    outline: 'none',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    borderColor: '#0056b3',
  },
  productCardHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
  },
};

export default ReviewOrder;
