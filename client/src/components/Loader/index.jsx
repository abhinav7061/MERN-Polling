import React from 'react'

const Loader = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 44,
    }
    return (
        <div style={style}>Loading...</div>
    )
}

export default Loader;