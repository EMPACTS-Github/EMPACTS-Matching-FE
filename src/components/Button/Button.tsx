import React from 'react';
import { Button as HeroButton } from '@heroui/react';
import { cn } from '@heroui/react';

// Complete preset configurations including both styling and button props
export const buttonPresets = {
  // Primary submit buttons (full width, large size)
  'primary-lg': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'primary-md': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  'primary-sm': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 rounded-lg text-sm',
    size: 'sm' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  
  // Submit button variants (automatically set type="submit")
  'submit-lg': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
    type: 'submit' as const,
  },
  'submit-md': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
    type: 'submit' as const,
  },
  
  // Action buttons (for actions like "Continue", "Next", etc.)
  'action-lg': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'action-md': {
    className: 'bg-primary text-white hover:bg-primary-80 active:bg-primary-100 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  
  // Secondary buttons
  'secondary-lg': {
    className: 'border-2 border-primary text-primary hover:bg-primary-20 active:bg-primary-40 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'secondary-md': {
    className: 'border-2 border-primary text-primary hover:bg-primary-20 active:bg-primary-40 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  'secondary-sm': {
    className: 'border-2 border-primary text-primary hover:bg-primary-20 active:bg-primary-40 rounded-lg text-sm',
    size: 'sm' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  
  // Light variants
  'light-lg': {
    className: 'bg-primary-20 text-primary hover:bg-primary-40 active:bg-primary-80 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'light-md': {
    className: 'bg-primary-20 text-primary hover:bg-primary-40 active:bg-primary-80 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  'light-sm': {
    className: 'bg-primary-20 text-primary hover:bg-primary-40 active:bg-primary-80 rounded-lg text-sm',
    size: 'sm' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  
  // Google sign-in button
  'google': {
    className: 'w-full mt-2 flex justify-center items-center rounded-lg bg-[#F4F4F4] text-black',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  
  // Danger variants
  'danger-lg': {
    className: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'danger-md': {
    className: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  'danger-sm': {
    className: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 rounded-lg text-sm',
    size: 'sm' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  
  // Success variants
  'success-lg': {
    className: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 w-full rounded-lg',
    size: 'lg' as const,
    fullWidth: true,
    radius: 'lg' as const,
  },
  'success-md': {
    className: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-lg',
    size: 'md' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
  'success-sm': {
    className: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-lg text-sm',
    size: 'sm' as const,
    fullWidth: false,
    radius: 'lg' as const,
  },
} as const;

// Type for button preset configuration
type ButtonPreset = {
  className: string;
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit' | 'reset';
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  // New preset variant prop
  variant?: keyof typeof buttonPresets;
  // Legacy props for backward compatibility
  size?: 'sm' | 'md' | 'lg';
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
  variant,
  // Legacy props
  size = 'lg',
  color = 'primary',
  fullWidth = false,
  className = '',
  radius = 'md'
}: ButtonProps) {
  // If using preset variant, apply complete preset configuration
  if (variant && buttonPresets[variant]) {
    const preset = buttonPresets[variant] as ButtonPreset;
    
    // Combine preset classes with additional className
    const finalClasses = cn(preset.className, className);
    
    return (
      <HeroButton
        type={preset.type || type} // Use preset type if available, otherwise fallback to type prop
        size={preset.size}
        disabled={disabled}
        isLoading={loading}
        onPress={onClick}
        className={`${finalClasses} data-[pressed=true]:scale-[0.97] transition-transform`}
        radius={preset.radius}
        variant="solid"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          boxShadow: 'none',
        }}
      >
        {children}
      </HeroButton>
    );
  }

  // Fallback to legacy HeroUI styling
  return (
    <HeroButton
      type={type}
      color={color}
      size={size}
      variant="solid"
      disabled={disabled}
      isLoading={loading}
      onPress={onClick}
      className={cn(
        fullWidth && 'w-full',
        className
      )}
      radius={radius}
    >
      {children}
    </HeroButton>
  );
}

export default Button; 
