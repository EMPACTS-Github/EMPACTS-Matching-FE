import React from 'react';
import variants from './variant';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';

interface TypographyProps {
  type?: TypographyTag;
  variant?: string;
  customStyle?: React.CSSProperties;
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLElement>;
  className?: string;
}

const Typography = ({
  type = 'p',
  variant = 'body-28-bold',
  customStyle = {},
  children,
  className,
  ...props
}: TypographyProps) => {
  const allowedTags: TypographyTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'small'];
  const Tag: TypographyTag = allowedTags.includes(type as TypographyTag)
    ? (type as TypographyTag)
    : 'p';

  const variantStyles = (variants as Record<string, string>)[variant] || '';

  return (
    <Tag style={customStyle} className={`${variantStyles} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
