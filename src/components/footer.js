import React from 'react';

const styles = {
  footer: {
    backgroundColor: "skyblue",
    color: "darkblue",
    textAlign: "center",
    padding: "18px",
    marginTop: "40px",
    borderTop: "2px solid #ddd",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "5px"
  },

  subtitle: {
    fontSize: "14px",
    color: "#444"
  }
};

function Footer() {

  return (

    <footer style={styles.footer}>

      <div style={styles.title}>
        © {new Date().getFullYear()} MyCart
      </div>

    </footer>

  );

}

export default Footer;