import React from 'react';
import Button from '.';
import { Link } from "react-router-dom";

const SignupBtn = () => {
    return (
        <Link to='/register'>
            <Button styles={`px-5 py-[5px] ml-5`} title={`Register`} />
        </Link>
    )
}

export default SignupBtn