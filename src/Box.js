import React from 'react';
import Radium from 'radium';

const Box = ({ children, label="Default Box Name" }) => {

    return <div>
        <div style={{
            fontWeight: 600,
            marginTop: '30px',
            marginBottom: '10px',
            fontSize: '30px',
            paddingLeft: '20px'
        }}>{label}</div>
        <div>{children}</div>
    </div>;
}

export default Radium(Box);