import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cart } from "./cart";
import { UserContext } from "./user";
import Header from "./header";
import Footer from "./footer";
import { useRef } from "react"; 

const PrintBill = () => {
    const { cart, setCart } = useContext(Cart);
    const { user, setUser } = useContext(UserContext);
    const hasPlacedOrder = useRef(false);

    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    

    const totalAmount = cart.reduce(
    (sum, item) =>
        sum + item.product.price * item.quantity,
    0
);

  const handleClick = () => {

    setCart([]);

    setUser(null);

    navigate("/mycart");

};
 useEffect(() => {

    if (hasPlacedOrder.current) return;

    if (!user?.userid || cart.length === 0) return;

    hasPlacedOrder.current = true;

    axios.post(
        `${process.env.REACT_APP_API_URL}/place-order`,
        {
            userid: user.userid,
            cartitems: cart,
            totalcost: totalAmount
        }
    )
    .then(res => setOrder(res.data))
    .catch(console.log);

}, [user?.userid, cart, totalAmount]);

    return (
    <>
      <Header title='THANK YOU' />
      <br /><br /><br />
      <div style={styles.container}>
        <h1 style={styles.heading}>INVOICE</h1>
        <br />
        <div style={styles.userDetails}>
          <center><h2>User Details</h2></center>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
        {cart.length === 0 ? (
          <p style={styles.noItems}>No items in the cart.</p>
        ) : (
          <div style={styles.billContainer}>
            <center><h2>Items Ordered</h2></center>
            <ul style={styles.itemList}>
              {cart.map((item) => {

    const product = item.product;

    return (

        <li
            key={product.id}
            style={styles.itemDetails}
        >

            <h3 style={styles.productTitle}>
                {product.title}
            </h3>

            <p>Category : {product.category}</p>

            <p>Price : ₹ {product.price}</p>

            <p>Quantity : {item.quantity}</p>

            <p>
                Total : ₹ {(product.price * item.quantity).toFixed(2)}
            </p>

        </li>

    );

})}
            </ul>

            {order && (

<div
    style={{
        marginTop:20,
        background:"white",
        padding:15,
        borderRadius:10
    }}
>

    <p><strong>Order ID :</strong> {order.orderid}</p>

    <p>
        <strong>Order Date :</strong>
        {" "}
        {new Date(order.orderdate).toLocaleString()}
    </p>

</div>

)}
            <h2 style={styles.totalAmount}>Total Amount: ₹ {totalAmount.toFixed(2)}</h2>
          </div>
        )}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={handleClick}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          style={styles.button}>Home</button>
      </div>
      <br /><br /><br />
      <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '900px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'beige',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: 'darkblue',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
},
  userDetails: {
    borderRadius: '16px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
  },
  noItems: {
    textAlign: 'center',
    color: '#666',
    fontSize: '18px',
  },
  billContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  itemList: {
    
    borderRadius: '10px',
    listStyleType: 'none',
    padding: '15px',
  },
  itemDetails: {
    backgroundColor : 'lightblue',
    borderRadius: '16px',
    padding: '15px',
    marginBottom: '20px'
  },
  productTitle: {
    fontSize: '20px',
    color: '#333',
  },
  totalAmount: {
  color : 'darkblue',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '22px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
  padding: '10px 20px',
  border: '2px solid transparent',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: 'black',
  transition: 'background-color 0.3s, border-color 0.3s',
  outline: 'none',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
},
};

export default PrintBill;
