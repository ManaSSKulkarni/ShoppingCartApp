import React, { useContext, useState, useEffect } from "react";
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
  const [previousOrders, setPreviousOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  console.log(user);

  // Fetch products
useEffect(() => {

    axios.get("https://fakestoreapi.com/products")
        .then(response => setProducts(response.data))
        .catch(error => alert(error));

}, []);



// Fetch previous orders
useEffect(() => {

    if (!user?.userid) return;

    axios.get(`${process.env.REACT_APP_API_URL}/orders/${user.userid}`)
        .then((res) => {
            setPreviousOrders(res.data);
        })
        .catch(console.log);

}, [user]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoryChange = (e) => setSelectedCategory(e.target.value);
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  const handleAdd = (product) => {

    const existing = cart.find(item => item.product.id === product.id);

    if(existing){

        setCart(
            cart.map(item =>
                item.product.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1
                  }
                : item
            )
        );

    }

    else{

        setCart([
            ...cart,
            {
                product,
                quantity:1
            }
        ]);

    }

};
  
  const handleRemove = (productId) => {

    const existing = cart.find(item => item.product.id === productId);

    if(!existing) return;

    if(existing.quantity === 1){

        setCart(
            cart.filter(item => item.product.id !== productId)
        );

    }

    else{

        setCart(
            cart.map(item =>
                item.product.id === productId
                ? {
                    ...item,
                    quantity:item.quantity-1
                  }
                : item
            )
        );

    }

};  /* Removing the first occurance of the product */

  const navigate = useNavigate();
  const handleReviewOrder = () => {

    if (cart.length === 0) {
        alert("Please add at least one product before reviewing your order.");
        return;
    }

    navigate("/mycart/register/order/revieworder");

};

  return (
    <>
      <Header title='ORDER' />
      <div style={styles.pageContainer}>
        <center>
          <h1 style={styles.welcomeText}>Welcome {user.name}</h1>
        </center>

        <h2 style={styles.previousHeading}>Previous Orders</h2>

{
previousOrders.length === 0 ? (

    <div style={styles.noOrders}>
        No previous orders found.
    </div>

) : (

    <div style={styles.previousOrdersContainer}>

        {previousOrders.map(order => (

            <div
                key={order.orderid}
                style={styles.orderCard}
            >

                <div style={styles.orderTop}>

                    <h3 style={styles.orderId}>
                        Order #{order.orderid}
                    </h3>

                    <span style={styles.amount}>
                        ₹ {Number(order.totalcost).toFixed(2)}
                    </span>

                </div>

                <p style={styles.orderDate}>
                    {new Date(order.orderdate).toLocaleString()}
                </p>

                <button
                    style={styles.viewButton}
                    onClick={() =>
                        setExpandedOrder(
                            expandedOrder === order.orderid
                                ? null
                                : order.orderid
                        )
                    }
                >
                    {expandedOrder === order.orderid
                        ? "Hide Items"
                        : "View Items"}
                </button>

                {
                    expandedOrder === order.orderid && (

                        <div style={styles.itemsContainer}>

                            {order.cartitems.map((item, index) => (

                                <div
                                    key={index}
                                    style={styles.itemCard}
                                >

                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        style={styles.itemImage}
                                    />

                                    <div>

                                        <h4>{item.product.title}</h4>

                                        <p>
                                            ₹ {item.product.price}
                                        </p>

                                        <p>
                                            Quantity : {item.quantity}
                                        </p>

                                        <p>
                                            Total : ₹ {(item.product.price * item.quantity).toFixed(2)}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )
                }

            </div>

        ))}

    </div>

)
}

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
          style={styles.button}>Review Order ({cart.reduce((sum,item)=>sum+item.quantity,0)} Items)</button>
        </div>

        <div style={styles.container}>
          <div style={styles.grid}>
            
            {filteredProducts.map(product => {
              const item = cart.find(c => c.product.id === product.id);
              const count = item ? item.quantity : 0;;
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
  previousHeading: {
    marginTop: "20px",
    marginBottom: "15px",
    color: "#003366",
    fontSize: "28px",
    fontWeight: "bold"
},

previousOrdersContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
    gap: "20px",
    marginBottom: "30px"
},

orderCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
    borderLeft: "6px solid #1976d2",
    transition: "0.3s"
},

orderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
},

orderId: {
    margin: 0,
    color: "#003366"
},

amount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "green"
},

orderDate: {
    color: "#666",
    marginTop: "12px"
},

noOrders: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#777",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
},


viewButton: {
    background: "#1976d2",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
},

itemsContainer: {
    marginTop: "20px"
},

itemCard: {
    display: "flex",
    gap: "20px",
    padding: "12px",
    marginBottom: "12px",
    background: "#f5f5f5",
    borderRadius: "8px"
},

itemImage: {
    width: "80px",
    height: "80px",
    objectFit: "contain"
},
};

export default Order;
