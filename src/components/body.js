import React from 'react';

const divStyle={
    maxWidth: '800px', 
    width: '100%', 
    padding: '20px',  
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.4)', // Transparent background color
};

const sectionStyle = {
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.4)', 
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

function Body(props){
    return(
            <section style={sectionStyle}>
                <div style={divStyle}>
                    {props.children}
                </div>
            </section>
    )
};

export default Body;