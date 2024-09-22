import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="text-xl font-bold bg-gray-700 p-3 rounded-lg shadow-lg mt-3"
    >
      {label}
    </button>
  );
};

export default Button;
