import React from 'react';
import { Button } from '@heroui/react';

interface AuthButtonProps {
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
}

function AuthButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  size = 'lg',
  variant = 'solid',
  color = 'primary',
  fullWidth = true,
  className = ''
}: AuthButtonProps) {
  const defaultClasses = 'rounded-lg bg-empacts border-empacts !text-white';
  const finalClasses = fullWidth 
    ? `w-full ${defaultClasses} ${className}` 
    : `${defaultClasses} ${className}`;

  return (
    <Button
      type={type}
      color={color}
      size={size}
      variant={variant}
      disabled={disabled}
      isLoading={loading}
      onPress={onClick}
      className={finalClasses}
    >
      {children}
    </Button>
  );
}

export default AuthButton;
