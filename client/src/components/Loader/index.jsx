import React from 'react';
import { logo } from '../../assets';

const Loader = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'hidden'
    };

    const imgStyle = {
        animation: 'scaleToFull 3s ease-in-out infinite',
        width: '200px',
        height: '200px',
    };

    return (
        <div style={style}>
            <img src={logo} style={imgStyle} />
        </div>
    );
};

export default Loader;
