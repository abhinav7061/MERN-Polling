import React from "react";

const Button = ({ styles, title, type, onclicks }) => (
  <button type={type} className={`font-poppins font-bold text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`} onClick={onclicks}>
    {title}
  </button>
);

export default Button;
