import React from 'react';

const divStyle = {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
};

const sectionStyle = {
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    background: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
};

function Body({ children }) {
    return (
        <section style={sectionStyle}>
            <div style={divStyle}>
                {children}
            </div>
        </section>
    );
}

export default Body;