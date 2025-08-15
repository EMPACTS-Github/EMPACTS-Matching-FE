import React from 'react';
import { Select as HeroSelect, SelectItem } from '@heroui/react';
import { cn } from '@heroui/react';
import type { Key } from '@react-types/shared';

// Complete preset configurations including both styling and select props
export const selectPresets = {
  // Flat variant presets
  'flat-sm': {
    className: 'text-sm',
    variant: 'flat' as const,
    color: 'default' as const,
    size: 'sm' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'flat-md': {
    className: '',
    variant: 'flat' as const,
    color: 'default' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'flat-lg': {
    className: '',
    variant: 'flat' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Bordered variant presets
  'bordered-sm': {
    className: 'text-sm border border-gray-300 focus:border-primary',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'bordered-md': {
    className: 'border border-gray-300 focus:border-primary',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'bordered-lg': {
    className: 'border border-gray-300 focus:border-primary',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Faded variant presets
  'faded-sm': {
    className: 'text-sm bg-gray-100 hover:bg-gray-200',
    variant: 'faded' as const,
    color: 'default' as const,
    size: 'sm' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'faded-md': {
    className: 'bg-gray-100 hover:bg-gray-200',
    variant: 'faded' as const,
    color: 'default' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'faded-lg': {
    className: 'bg-gray-100 hover:bg-gray-200',
    variant: 'faded' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Underlined variant presets
  'underlined-sm': {
    className: 'text-sm border-b-2 border-gray-300 focus:border-primary',
    variant: 'underlined' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'none' as const,
    fullWidth: true,
  },
  'underlined-md': {
    className: 'border-b-2 border-gray-300 focus:border-primary',
    variant: 'underlined' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'none' as const,
    fullWidth: true,
  },
  'underlined-lg': {
    className: 'border-b-2 border-gray-300 focus:border-primary',
    variant: 'underlined' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    radius: 'none' as const,
    fullWidth: true,
  },

  // Primary color variants
  'primary-flat': {
    className: 'bg-primary-20 text-primary border-primary-40',
    variant: 'flat' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'primary-bordered': {
    className: 'border-primary text-primary focus:border-primary-80',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Secondary color variants
  'secondary-flat': {
    className: 'bg-secondary-20 text-secondary border-secondary-40',
    variant: 'flat' as const,
    color: 'secondary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },
  'secondary-bordered': {
    className: 'border-secondary text-secondary focus:border-secondary-80',
    variant: 'bordered' as const,
    color: 'secondary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
  },

  // Compact variants (smaller sizes)
  'compact-sm': {
    className: 'text-xs py-1',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'sm' as const,
    radius: 'sm' as const,
    fullWidth: false,
  },
  'compact-md': {
    className: 'text-sm py-2',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'md' as const,
    radius: 'sm' as const,
    fullWidth: false,
  },

  // Form field variants
  'form-field': {
    className: 'w-full border border-gray-300 focus:border-primary rounded-md',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'md' as const,
    fullWidth: true,
    labelPlacement: 'outside' as const,
  },
  'form-field-sm': {
    className: 'w-full text-sm border border-gray-300 focus:border-primary rounded-md',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
    fullWidth: true,
    labelPlacement: 'outside' as const,
  },

  // Search/filter variants
  'search': {
    className: 'w-full bg-white border border-gray-300 focus:border-primary rounded-lg',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'md' as const,
    radius: 'lg' as const,
    fullWidth: true,
  },
  'filter': {
    className: 'min-w-[200px] border border-gray-300 focus:border-primary',
    variant: 'bordered' as const,
    color: 'primary' as const,
    size: 'sm' as const,
    radius: 'md' as const,
    fullWidth: false,
  },

} as const;

// Type for select preset configuration
type SelectPreset = {
  className?: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  selectorIcon?: React.ReactNode;
};

// Type for select items
export interface SelectItemType {
  key: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface SelectProps {
  // Required preset variant prop
  variant: keyof typeof selectPresets;
  
  // Basic props
  items?: SelectItemType[];
  selectedKeys?: 'all' | Iterable<Key>;
  defaultSelectedKeys?: 'all' | Iterable<Key>;
  disabledKeys?: Iterable<Key>;
  selectionMode?: 'single' | 'multiple';
  
  // Event handlers
  onSelectionChange?: (keys: "all" | Set<Key> & {anchorKey?: string; currentKey?: string}) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  
  // Content props
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  selectorIcon?: React.ReactNode;
  
  // Additional customization
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
}

const Select = ({
  variant,
  items = [],
  selectedKeys,
  defaultSelectedKeys,
  disabledKeys,
  selectionMode = 'single',
  onSelectionChange,
  onOpenChange,
  onClose,
  onChange,
  placeholder = 'Select an option',
  label,
  description,
  errorMessage,
  startContent,
  endContent,
  selectorIcon,
  className = '',
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
}: SelectProps) => {
  const preset = selectPresets[variant] as SelectPreset;

  // Combine preset classes with additional className
  const finalClasses = cn(preset.className, className);

  return (
    <HeroSelect
      items={items}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      disabledKeys={disabledKeys}
      selectionMode={selectionMode}
      onSelectionChange={onSelectionChange}
      onOpenChange={onOpenChange}
      onClose={onClose}
      onChange={onChange}
      placeholder={preset.placeholder || placeholder}
      label={preset.label || label}
      description={preset.description || description}
      errorMessage={preset.errorMessage || errorMessage}
      startContent={preset.startContent || startContent}
      endContent={preset.endContent || endContent}
      selectorIcon={preset.selectorIcon || selectorIcon}
      variant={preset.variant}
      color={preset.color}
      size={preset.size}
      radius={preset.radius}
      fullWidth={preset.fullWidth}
      labelPlacement={preset.labelPlacement}
      isRequired={preset.isRequired || isRequired}
      isDisabled={preset.isDisabled || isDisabled}
      isInvalid={preset.isInvalid || isInvalid}
      className={finalClasses}
    >
      {(item) => (
        <SelectItem key={item.key} isDisabled={item.disabled}>
          {item.label}
        </SelectItem>
      )}
    </HeroSelect>
  );
};

export default Select;
