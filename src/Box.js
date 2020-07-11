import React from 'react';
import Radium from 'radium';

const Box = ({ children, label="Default Box Name" }) => {

    return <div>
        <div style={{
            fontWeight: 600,
            marginTop: 30,
            marginBottom: 10,
            fontSize: 30,
            paddingLeft: 20,
        }}>{label}</div>
        <div>{children}</div>
    </div>;
}

export default Radium(Box);