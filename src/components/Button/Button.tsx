import React from 'react';
import { Button as HeroButton } from '@heroui/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  fullWidth?: boolean;
  className?: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  size = 'lg',
  variant = 'solid',
  color = 'primary',
  fullWidth = false,
  className = '',
  radius = 'md'
}: ButtonProps) {
  const finalClasses = fullWidth 
    ? `w-full ${className}` 
    : className;

  return (
    <HeroButton
      type={type}
      color={color}
      size={size}
      variant={variant}
      disabled={disabled}
      isLoading={loading}
      onPress={onClick}
      className={finalClasses}
      radius={radius}
    >
      {children}
    </HeroButton>
  );
}

export default Button; 
