import React from 'react';

interface FormDividerProps {
  text?: string;
  className?: string;
}

function FormDivider({ 
  text = 'Or', 
  className = 'my-6 text-gray-500' 
}: FormDividerProps) {
  return (
    <div className={`${className} flex items-center`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-black text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export default FormDivider;
