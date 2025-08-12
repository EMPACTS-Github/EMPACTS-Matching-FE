import React from 'react';

interface TextLineProps {
  text: string | undefined;
  className?: string;
}

const TextLine: React.FC<TextLineProps> = ({ text, className = '' }) => {
  return <p className={className}>{text}</p>;
};

export default TextLine;
