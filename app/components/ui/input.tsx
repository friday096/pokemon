import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`p-2 border rounded-lg text-center bg-violet-600 text-white focus:outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
