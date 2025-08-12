import React from 'react';

type FormHeaderProps = {
  text: string;
  className: string;
};

function FormTitle({ text, className }: FormHeaderProps) {
  return <p className={`${className}`}>{text}</p>;
}

export default FormTitle;
