import React from 'react';
import { Input as HeroInput } from '@heroui/react';

// Complete input preset configurations based on Figma design system
export const inputPresets = {
  // Default Input variants with sizes
  'default-sm': {
    className: 'bg-white text-sm',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'sm' as const,
    radius: 'md' as const,
  },
  'default-md': {
    className: 'bg-white',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'md' as const,
    radius: 'md' as const,
  },
  'default-lg': {
    className: 'bg-white text-lg',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'md' as const,
  },
  'search-lg': {
    className: 'bg-white text-lg',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'full' as const,
  },

  // Line Fill variants with sizes (underlined style)
  'line-fill-sm': {
    className: 'bg-white border-neutral-50 rounded-none text-sm',
    variant: 'underlined' as const,
    color: 'default' as const,
    size: 'sm' as const,
    radius: 'none' as const,
  },
  'line-fill-md': {
    className: 'bg-white border-neutral-50 rounded-none',
    variant: 'underlined' as const,
    color: 'default' as const,
    size: 'md' as const,
    radius: 'none' as const,
  },
  'line-fill-lg': {
    className: 'bg-white border-neutral-50 rounded-none text-lg',
    variant: 'underlined' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'none' as const,
  },
} as const;

// Type for input preset configuration
type InputPreset = {
  className: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isDisabled?: boolean;
  isInvalid?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label?: React.ReactNode;
  placeholder?: string;
  isRequired?: boolean;
  size?: 'sm' | 'md' | 'lg';
  description?: React.ReactNode;
  className?: string;
  labelPlacement?: 'inside' | 'outside' | 'outside-left';
  // New preset variant prop
  preset?: keyof typeof inputPresets;
  // Icon content props
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  // Additional HeroUI props
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  isClearable?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  baseRef?: React.RefObject<HTMLDivElement>;
  disableAnimation?: boolean;
  // Placeholder customization
  placeholderClassName?: string;
  // Legacy props for backward compatibility
  customVariant?: keyof typeof inputPresets;
  customStyle?: 'underlined' | 'bordered' | 'filled';
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

interface TextInputProps extends BaseInputProps {
  variant: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file';
  type?: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file' | 'number';
}

const Input = (props: TextInputProps) => {
  const {
    value,
    onChange,
    isInvalid = false,
    errorMessage = '',
    color = 'default',
    label,
    placeholder,
    isRequired = false,
    size = 'md',
    description,
    className = '',
    labelPlacement = 'outside',
    preset: presetVariant,
    startContent,
    endContent,
    defaultValue,
    minLength,
    maxLength,
    pattern,
    isClearable,
    isReadOnly,
    isDisabled,
    baseRef,
    disableAnimation,
    placeholderClassName,
    // Legacy props
    customVariant,
    customStyle = 'bordered',
    inputMode,
  } = props;

  // Determine input type based on variant
  const inputType =
    props.type ||
    (props.variant === 'email' ? 'email' : props.variant === 'password' ? 'password' : 'text');

  // If using preset variant, apply complete preset configuration
  if (presetVariant && inputPresets[presetVariant]) {
    const preset = inputPresets[presetVariant] as InputPreset;

    // Determine the appropriate color based on current state
    let dynamicColor = preset.color;
    let dynamicClassName = preset.className;

    // Handle error state
    if (isInvalid) {
      dynamicColor = 'danger';
      // Update border color to error for all variants
      if (preset.variant === 'underlined') {
        // For line-fill variants, update bottom border color to error
        dynamicClassName = preset.className.replace('border-neutral-50', 'border-error');
      } else if (preset.variant === 'bordered') {
        // For bordered variants, replace border color to error
        dynamicClassName = preset.className.replace('border-neutral-50', 'border-error');
      }
    }
    // Handle disabled state
    else if (isDisabled || preset.isDisabled) {
      dynamicColor = 'default';
      dynamicClassName = preset.className + ' opacity-50';
    }

    // Combine preset classes with additional className
    const finalClasses = [dynamicClassName, className].filter(Boolean).join(' ');

    // Build classNames object for custom placeholder styling
    const customClassNames = placeholderClassName
      ? {
          input: [
            `[&::placeholder]:text-[14px]`,
            `[&::-webkit-input-placeholder]:text-[14px]`,
            `[&::-moz-placeholder]:text-[14px]`,
            `[&:-ms-input-placeholder]:text-[14px]`,
          ].join(' '),
        }
      : undefined;

    return (
      <HeroInput
        type={inputType}
        inputMode={inputMode}
        variant={preset.variant}
        color={dynamicColor}
        size={preset.size}
        radius={preset.radius}
        label={label}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        description={description}
        onChange={(e) => onChange(e.target.value)}
        isRequired={isRequired}
        isDisabled={preset.isDisabled || isDisabled}
        isReadOnly={isReadOnly}
        isClearable={isClearable}
        startContent={startContent}
        endContent={endContent}
        labelPlacement={labelPlacement}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        baseRef={baseRef}
        disableAnimation={disableAnimation}
        className={finalClasses}
        classNames={customClassNames}
      />
    );
  }

  // Legacy custom variant support
  if (customVariant && inputPresets[customVariant]) {
    const preset = inputPresets[customVariant] as InputPreset;
    const heroVariant =
      customStyle === 'filled' ? 'flat' : customStyle === 'bordered' ? 'bordered' : 'underlined';
    const finalClasses = [preset.className, className].filter(Boolean).join(' ');

    return (
      <HeroInput
        type={inputType}
        inputMode={inputMode}
        variant={heroVariant}
        radius='none'
        size={size}
        label={label}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        description={description}
        onChange={(e) => onChange(e.target.value)}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isClearable={isClearable}
        startContent={startContent}
        endContent={endContent}
        labelPlacement={labelPlacement}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        baseRef={baseRef}
        disableAnimation={disableAnimation}
        className={finalClasses}
        classNames={{
          base: 'group',
          mainWrapper: 'h-full',
          inputWrapper: [
            'bg-transparent border-inherit transition-all duration-200',
            '!bg-transparent !border-inherit',
          ],
          input: ['text-inherit placeholder:text-inherit/60', 'data-[has-value=true]:text-inherit'],
          label: 'text-inherit/80 group-data-[filled-within=true]:text-inherit',
          errorMessage: 'text-inherit',
          description: 'text-inherit/70',
        }}
      />
    );
  }

  // Default HeroUI styling
  return (
    <HeroInput
      type={inputType}
      inputMode={inputMode}
      variant='bordered'
      radius='md'
      size={size}
      label={label}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      isInvalid={isInvalid}
      color={color}
      errorMessage={errorMessage}
      description={description}
      onChange={(e) => onChange(e.target.value)}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isClearable={isClearable}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      baseRef={baseRef}
      disableAnimation={disableAnimation}
      className={className}
    />
  );
};

export default Input;
