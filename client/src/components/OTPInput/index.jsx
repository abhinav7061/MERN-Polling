import React, { useState } from 'react';

const OTPInput = ({ length = 6, onChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));

    const handleChange = (value, index) => {
        const newOtp = [...otp];

        if (value !== '' && newOtp.slice(0, index).some(v => v === '')) {
            for (let i = 0; i <= index; i++) {
                if (newOtp[i] === '') {
                    newOtp[i] = value;
                    break;
                }
            }
        } else {
            newOtp[index] = value;
            if (value !== '' && index < length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }

        setOtp(newOtp);
        onChange(newOtp.join(''));

    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] !== '') {
                handleChange('', index);
            } else if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
                handleChange('', index - 1);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((value, index) => (
                <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
            ))}
        </div>
    );
};

export default OTPInput;
