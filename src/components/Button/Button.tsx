import React from 'react';
import { Button as HeroButton } from '@heroui/react';
import { cn } from '@heroui/react';

// Predefined button variants based on custom colors
export const buttonVariants = {
  // Primary variants
  primary: {
    solid: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100',
    bordered: 'border-2 border-primary text-primary hover:bg-primary-20 active:bg-primary-40',
    light: 'bg-primary-20 text-primary hover:bg-primary-40 active:bg-primary-80',
  },
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  // Custom variant prop for predefined styles
  customVariant?: keyof typeof buttonVariants;
  customStyle?: 'solid' | 'bordered' | 'light';
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
  customVariant,
  customStyle = 'solid',
  fullWidth = false,
  className = '',
  radius = 'md'
}: ButtonProps) {
  // Get custom variant classes if specified
  const customVariantClass = customVariant && customStyle 
    ? buttonVariants[customVariant][customStyle] 
    : '';

  // Combine classes with proper override capability
  // className comes last to allow overriding any custom variant styles
  const finalClasses = [
    fullWidth ? 'w-full' : '',
    customVariantClass,
    className // This allows overriding any previous styles
  ].filter(Boolean).join(' ');

  // If using custom variant, use unstyled HeroButton with better override support
  if (customVariant) {
    return (
      <HeroButton
        type={type}
        size={size}
        disabled={disabled}
        isLoading={loading}
        onPress={onClick}
        className={`${finalClasses} data-[pressed=true]:scale-[0.97] transition-transform`}
        radius={radius}
        variant="solid"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          boxShadow: 'none', // Remove default shadows to allow custom styling
        }}
      >
        {children}
      </HeroButton>
    );
  }

  // Default HeroUI styling
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
