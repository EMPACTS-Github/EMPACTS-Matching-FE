import React from 'react';

type FormHeaderProps = {
  text: string;
  className: string;
};

const FormTitle = ({ text, className }: FormHeaderProps) => {
  return <p className={`${className}`}>{text}</p>;
};

export default FormTitle;
