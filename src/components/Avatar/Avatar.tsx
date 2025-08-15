import React from 'react';
import { Avatar as HeroAvatar } from '@heroui/avatar';
import { a, pre } from 'framer-motion/client';

export const avatarPresets = {
  // Default Avatar variants with sizes
  'default-sm': {
    color: 'primary' as const,
    isBordered: true as const,
    size: 'sm' as const,
    radius: 'full' as const,
    className: 'bg-white',
  },
  'default-md': {
    color: 'primary' as const,
    isBordered: true as const,
    size: 'md' as const,
    radius: 'full' as const,
    className: 'bg-white',
  },
  'default-lg': {
    color: 'primary' as const,
    isBordered: true as const,
    size: 'lg' as const,
    radius: 'full' as const,
    className: 'bg-white',
  },
} as const;

// Type for avatar preset configuration
type AvatarPreset = {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isBordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className: string;
};

interface BaseAvatarProps {
  src: string | undefined;
  alt?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  icon?: React.ReactNode;
  fallback?: string;
  isBordered?: boolean;
  isDisabled?: boolean;
  isFocusable?: boolean;
  showFallback?: boolean;
  className?: string;
  // New preset variant prop
  variant?: keyof typeof avatarPresets;
}

const Avatar = (props: BaseAvatarProps) => {
  const {
    src,
    alt,
    color,
    radius,
    size,
    name,
    icon,
    fallback,
    isBordered,
    isDisabled,
    isFocusable,
    showFallback,
    className,
    variant,
  } = props;

  // If using preset variant, apply complete preset configuration
  if (variant && avatarPresets[variant]) {
    const preset = avatarPresets[variant] as AvatarPreset;

    let dynamicClassName = preset.className;
    // Combine preset classes with additional className
    const finalClasses = [dynamicClassName, className].filter(Boolean).join(' ');

    return (
      <HeroAvatar
        src={src}
        alt={alt}
        color={preset.color}
        radius={preset.radius}
        size={preset.size}
        name={name}
        icon={icon}
        fallback={fallback}
        isBordered={preset.isBordered}
        isDisabled={isDisabled}
        isFocusable={isFocusable}
        showFallback={showFallback}
        className={finalClasses}
      />
    );
  }
  // Fallback to default Avatar if no variant is provided
  return (
    <HeroAvatar
      src={src}
      alt={alt}
      color={color}
      radius={radius}
      size={size}
      name={name}
      icon={icon}
      fallback={fallback}
      isBordered={isBordered}
      isDisabled={isDisabled}
      isFocusable={isFocusable}
      showFallback={showFallback}
      className={className}
    />
  );
};
export default Avatar;
