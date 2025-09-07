import React from 'react';

interface FormFooterActionProps {
  text: string;
  action: React.ReactNode;
  className?: string;
}

const FormFooterAction = ({ text, action, className = '' }: FormFooterActionProps) => {
  return (
    <div className={`text-center mt-4 ${className}`}>
      <span className='text-gray-500'>{text} </span>
      {action}
    </div>
  );
};

export default FormFooterAction;
