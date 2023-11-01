import React from 'react';
import Button from '.';
import { NavLink } from "react-router-dom";

const LoginBtn = () => {
    return (
            <NavLink to='/login'>
                <Button styles={`px-5 py-[5px] ml-5`} title={`Login`} />
            </NavLink>
    )
}

export default LoginBtn