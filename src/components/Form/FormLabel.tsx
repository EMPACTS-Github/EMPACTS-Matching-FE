import React from 'react';

type FormLabel = {
  text: string;
  className: string;
  isRequired?: boolean;
};

const FormLabel = ({ className, text, isRequired = false }: FormLabel) => {
  return (
    <p className={`${className}`}>
      {text} {isRequired && <span className='text-error'>*</span>}
    </p>
  );
};

export default FormLabel;
