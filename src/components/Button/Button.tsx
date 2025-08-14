import React from 'react';
import { Button as HeroButton } from '@heroui/react';
import { cn } from '@heroui/react';

// Complete preset configurations including both styling and button props
export const buttonPresets = {
  // Primary Buttons - Purple background (#9200FE)
  'primary-sm': {
    className: 'bg-primary text-white hover:bg-primary-40 active:bg-primary-40 text-sm',
    variant: 'solid' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'primary-md': {
    className: 'bg-primary text-white hover:bg-primary-40 active:bg-primary-40',
    variant: 'solid' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'primary-lg': {
    className: 'bg-primary text-white hover:bg-primary-40 active:bg-primary-40',
    variant: 'solid' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },

  // Secondary Buttons - White background with purple border
  'secondary-sm': {
    className: 'bg-white text-white hover:bg-secondary-80 hover:text-white text-sm',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'secondary-md': {
    className: 'bg-white text-white hover:bg-secondary-80 hover:text-white',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'secondary-lg': {
    className: 'bg-white text-white hover:bg-secondary-80 hover:text-white',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },

  // Tertiary Buttons - Transparent with purple border
  'tertiary-sm': {
    className: 'bg-transparent text-primary hover:bg-primary-20 text-sm',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'tertiary-md': {
    className: 'bg-transparent text-primary hover:bg-primary-20',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'tertiary-lg': {
    className: 'bg-transparent text-primary hover:bg-primary-20',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },

  // Ghost Buttons - Transparent with purple text
  'ghost-sm': {
    className: 'bg-transparent text-primary hover:bg-primary-20 text-sm',
    variant: 'light' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'ghost-md': {
    className: 'bg-transparent text-primary hover:bg-primary-20',
    variant: 'light' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'ghost-lg': {
    className: 'bg-transparent text-primary hover:bg-primary-20',
    variant: 'light' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },

  // Special Warning Buttons - Red background
  'warning-sm': {
    className: 'bg-error text-white hover:bg-error active:bg-error text-sm',
    variant: 'solid' as const,
    color: 'danger' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'warning-md': {
    className: 'bg-error text-white hover:bg-error active:bg-error',
    variant: 'solid' as const,
    color: 'danger' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'warning-lg': {
    className: 'bg-error text-white hover:bg-error active:bg-error',
    variant: 'solid' as const,
    color: 'danger' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },

  // Full width variants (default to medium size)
  'primary-full': {
    className: 'bg-primary text-white hover:bg-primary-40 active:bg-primary-40 w-full',
    variant: 'solid' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'secondary-full': {
    className: 'bg-white text-primary hover:bg-secondary-80 hover:text-white w-full',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'tertiary-full': {
    className: 'bg-transparent text-primary hover:bg-primary-20 w-full',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'ghost-full': {
    className: 'bg-transparent text-primary hover:bg-primary-20 w-full',
    variant: 'light' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'warning-full': {
    className: 'bg-error text-white hover:bg-error active:bg-error w-full',
    variant: 'solid' as const,
    color: 'danger' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Google sign-in button
  'google': {
    className: 'w-full mt-2 flex justify-center items-center bg-neutral-40 text-black',
    variant: 'solid' as const,
    color: 'default' as const,
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },

} as const;

// Type for button preset configuration
type ButtonPreset = {
  className?: string;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isIconOnly?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  // New preset variant prop
  variant?: keyof typeof buttonPresets;
  // Icon content props
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  // Icon-only button support
  isIconOnly?: boolean;
  // Legacy props for backward compatibility
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  fullWidth?: boolean;
  className?: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Button = ({
  children,
  onClick,
  type = 'button',
  loading = false,
  variant,
  startContent,
  endContent,
  isIconOnly = false,
  // Legacy props
  size = 'lg',
  color = 'primary',
  fullWidth = false,
  className = '',
  radius = 'md',
  disabled = false,
}: ButtonProps) => {
  // If using preset variant, apply complete preset configuration
  if (variant && buttonPresets[variant]) {
    const preset = buttonPresets[variant] as ButtonPreset;

    // Handle disabled state automatically
    const isDisabled = disabled || preset.isDisabled;
    
    // Handle loading state automatically
    const isLoading = loading;

    // Combine preset classes with additional className
    const finalClasses = cn(preset.className, className);

    return (
      <HeroButton
        type={preset.type || type}
        variant={preset.variant}
        color={preset.color}
        size={preset.size}
        radius={preset.radius}
        fullWidth={preset.fullWidth || fullWidth}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isIconOnly={preset.isIconOnly || isIconOnly}
        onPress={onClick}
        startContent={startContent}
        endContent={endContent}
        className={`${finalClasses}`}
      >
        {children}
      </HeroButton>
    );
  }

  // Fallback to legacy HeroUI styling
  return (
    <HeroButton
      type={type}
      variant="solid"
      color={color}
      size={size}
      disabled={disabled}
      isLoading={loading}
      isIconOnly={isIconOnly}
      onPress={onClick}
      startContent={startContent}
      endContent={endContent}
      className={cn(fullWidth && 'w-full', className)}
      radius={radius}
    >
      {children}
    </HeroButton>
  );
};

export default Button;
