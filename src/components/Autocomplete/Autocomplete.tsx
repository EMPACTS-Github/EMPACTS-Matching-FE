import React from 'react';
import { Autocomplete as HeroAutocomplete, AutocompleteItem, cn } from '@heroui/react';

// Complete autocomplete preset configurations
export const autocompletePresets = {
  // Default Autocomplete variants with sizes
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

  // Search variant
  'search-lg': {
    className: 'bg-white text-lg',
    variant: 'bordered' as const,
    color: 'default' as const,
    size: 'lg' as const,
    radius: 'full' as const,
  },
} as const;

// Type for autocomplete preset configuration
type AutocompletePreset = {
  className: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isDisabled?: boolean;
  isInvalid?: boolean;
};

export interface AutocompleteOption {
  key: string;
  label: string;
  value: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

interface AutocompleteProps {
  // Required props
  options: AutocompleteOption[];
  selectedKey?: string | number;
  onSelectionChange?: (key: string | number | null) => void;

  // Input value for controlled filtering
  inputValue?: string;
  onInputChange?: (value: string) => void;

  // Preset variant
  preset?: keyof typeof autocompletePresets;

  // Label and placeholder
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;

  // Validation
  isInvalid?: boolean;
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  isRequired?: boolean;

  // Styling
  className?: string;
  labelPlacement?: 'inside' | 'outside' | 'outside-left';

  // States
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isLoading?: boolean;

  // Icon content
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

  // Behavior
  allowsCustomValue?: boolean;
  shouldCloseOnBlur?: boolean;
  clearButtonProps?: any;
  isClearable?: boolean;

  // Additional props
  defaultSelectedKey?: string;
  defaultInputValue?: string;
  disabledKeys?: string[];

  // Menu props
  menuTrigger?: 'focus' | 'input' | 'manual';
  scrollRef?: React.RefObject<HTMLElement>;

  // Callbacks
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;

  // Custom rendering
  renderItem?: (item: AutocompleteOption) => React.ReactNode;

  // Size override (for non-preset usage)
  size?: 'sm' | 'md' | 'lg';
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  selectedKey,
  onSelectionChange,
  inputValue,
  onInputChange,
  preset: presetVariant,
  label,
  placeholder,
  description,
  isInvalid = false,
  errorMessage,
  isRequired = false,
  className = '',
  labelPlacement = 'outside',
  isDisabled = false,
  isReadOnly = false,
  isLoading = false,
  startContent,
  endContent,
  allowsCustomValue = false,
  shouldCloseOnBlur = true,
  clearButtonProps,
  isClearable = true,
  defaultSelectedKey,
  defaultInputValue,
  disabledKeys,
  menuTrigger = 'input',
  scrollRef,
  onFocus,
  onBlur,
  onClear,
  renderItem,
  size = 'md',
}) => {
  // If using preset variant, apply complete preset configuration
  if (presetVariant && autocompletePresets[presetVariant]) {
    const preset = autocompletePresets[presetVariant] as AutocompletePreset;

    // Determine the appropriate color based on current state
    let dynamicColor = preset.color;
    let dynamicClassName = preset.className;

    // Handle error state
    if (isInvalid) {
      dynamicColor = 'danger';
      // Update border color to error for all variants
      if (preset.variant === 'underlined' || preset.variant === 'bordered') {
        dynamicClassName = preset.className.replace('border-neutral-50', 'border-error');
      }
    }
    // Handle disabled state
    else if (isDisabled || preset.isDisabled) {
      dynamicColor = 'default';
      dynamicClassName = preset.className + ' opacity-50';
    }

    // Combine preset classes with additional className
    const finalClasses = cn(dynamicClassName, className);

    return (
      <HeroAutocomplete
        variant={preset.variant}
        color={dynamicColor}
        size={preset.size}
        radius={preset.radius}
        label={label}
        placeholder={placeholder}
        description={description}
        selectedKey={selectedKey}
        onSelectionChange={onSelectionChange}
        inputValue={inputValue}
        onInputChange={onInputChange}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        isRequired={isRequired}
        isDisabled={preset.isDisabled || isDisabled}
        isReadOnly={isReadOnly}
        isLoading={isLoading}
        startContent={startContent}
        endContent={endContent}
        labelPlacement={labelPlacement}
        allowsCustomValue={allowsCustomValue}
        shouldCloseOnBlur={shouldCloseOnBlur}
        clearButtonProps={clearButtonProps}
        isClearable={isClearable}
        defaultSelectedKey={defaultSelectedKey}
        defaultInputValue={defaultInputValue}
        disabledKeys={disabledKeys}
        menuTrigger={menuTrigger}
        scrollRef={scrollRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onClear={onClear}
        className={finalClasses}
      >
        {renderItem
          ? options.map((item) => (
              <AutocompleteItem
                key={item.key}
                textValue={item.label}
                startContent={item.startContent}
                endContent={item.endContent}
                description={item.description}
              >
                {renderItem(item)}
              </AutocompleteItem>
            ))
          : options.map((item) => (
              <AutocompleteItem
                key={item.key}
                textValue={item.label}
                startContent={item.startContent}
                endContent={item.endContent}
                description={item.description}
              >
                {item.label}
              </AutocompleteItem>
            ))}
      </HeroAutocomplete>
    );
  }

  // Default HeroUI styling (fallback)
  return (
    <HeroAutocomplete
      variant='bordered'
      radius='md'
      size={size}
      label={label}
      placeholder={placeholder}
      description={description}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isLoading={isLoading}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      allowsCustomValue={allowsCustomValue}
      shouldCloseOnBlur={shouldCloseOnBlur}
      clearButtonProps={clearButtonProps}
      isClearable={isClearable}
      defaultSelectedKey={defaultSelectedKey}
      defaultInputValue={defaultInputValue}
      disabledKeys={disabledKeys}
      menuTrigger={menuTrigger}
      scrollRef={scrollRef}
      onFocus={onFocus}
      onBlur={onBlur}
      onClear={onClear}
      className={className}
    >
      {renderItem
        ? options.map((item) => (
            <AutocompleteItem
              key={item.key}
              textValue={item.label}
              startContent={item.startContent}
              endContent={item.endContent}
              description={item.description}
            >
              {renderItem(item)}
            </AutocompleteItem>
          ))
        : options.map((item) => (
            <AutocompleteItem
              key={item.key}
              textValue={item.label}
              startContent={item.startContent}
              endContent={item.endContent}
              description={item.description}
            >
              {item.label}
            </AutocompleteItem>
          ))}
    </HeroAutocomplete>
  );
};

export default Autocomplete;
