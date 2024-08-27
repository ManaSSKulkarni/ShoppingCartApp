import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cart } from './cart';
import { UserContext } from './user';
import Header from './header';
import Footer from './footer';

const Order = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(Cart);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => alert(error));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoryChange = (e) => setSelectedCategory(e.target.value);
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  const handleAdd = (product) => setCart([...cart, product]);
  
  const handleRemove = (productId) => {
    const cartcopy = [...cart];
    const pindex = cartcopy.findIndex(p => p.id === productId);
    if (pindex !== -1) {
      cartcopy.splice(pindex, 1); 
      setCart(cartcopy);
    }
  };  /* Removing the first occurance of the product */

  const navigate = useNavigate();
  const handleReviewOrder = () => navigate('/mycart/register/order/revieworder');

  return (
    <>
      <Header title='ORDER' />
      <div style={styles.pageContainer}>
        <center>
          <h1 style={styles.welcomeText}>Welcome {user.name}</h1>
        </center>

        <div style={styles.headerContainer}>
        <select value={selectedCategory} onChange={categoryChange} style={styles.dropdown}>
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <button 
          onClick={handleReviewOrder} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}  
          style={styles.button}>Review Order ( {cart.length} Items)</button>
        </div>

        <div style={styles.container}>
          <div style={styles.grid}>
            
            {filteredProducts.map(product => {
              const count = cart.filter(p => p.id === product.id).length;
              return (
                <Product
                  key={product.id}
                  product={product}
                  onSelect={() => handleAdd(product)}
                  onRemove={() => handleRemove(product.id)}
                  count={count}
                  style={count>0 ? styles.selectedStyle : styles.defaultStyle}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Product = ({ product, onSelect, onRemove,count, style }) => (
  <div style={{ ...styles.productCard, ...style }}>
    <img src={product.image} alt={product.title} style={styles.image} />
    <h3 style={styles.productTitle}>{product.title}</h3>
    <p style={styles.productInfo}><strong>Category:</strong> {product.category}</p>
    <p style={styles.productInfo}><strong>Description:</strong> {product.description}</p>
    <p style={styles.productInfo}><strong>Rating:</strong> {product.rating.rate} (by {product.rating.count} Users)</p>
    <h4 style={styles.productPrice}>Rs {product.price}</h4>

    <button 
    onClick={onSelect} 
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.pbuttonHover.backgroundColor}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.pbutton.backgroundColor} 
    style={styles.pbutton}>{`Add ${count > 0 ? ` (${count})` : ''}`}</button>

    <button 
    onClick={onRemove} 
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.pbuttonHover.backgroundColor}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.pbutton.backgroundColor} 
    style={styles.pbutton}>Remove</button>
  </div>
);

const styles = {
  pageContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  welcomeText: {
    color: 'black',
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
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
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent', 
    color: 'white',
    backgroundColor: 'black',
    outline: 'none',
    margin: '0 10px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  buttonHover:{
    backgroundColor: 'gray',
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
  
  dropdown: {
    padding: '10px',
    borderRadius: '4px',
    border: '2px solid #0056b3', 
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#333',
    fontSize: '16px',
  },
  container: {
    padding: '20px',
    backgroundColor: 'lightblue',
    borderRadius: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  productCard: {
    padding: '15px',
    border: '2px solid #ddd', 
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  productCardHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
  },
  productTitle: {
    fontSize: '18px',
    color: '#333',
  },
  productInfo: {
    color: '#666',
    fontSize: '14px',
  },
  productPrice: {
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  selectedStyle: {
    backgroundColor: 'beige',
    color: 'white',
    border: '2px solid #0056b3', 
  },
  defaultStyle: {
    backgroundColor: 'white',
    color: '#333',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '200px',
    marginBottom: '10px',
    borderRadius: '4px',
  },
};

export default Order;
