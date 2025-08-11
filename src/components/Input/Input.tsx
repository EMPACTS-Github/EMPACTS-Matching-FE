import React from "react";
import { Input as HeroInput } from "@heroui/react";

// Predefined input variants based on custom colors
export const inputVariants = {
  // variant later
};

interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  color?: "default" | "danger";
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  description?: string;
  className?: string;
  labelPlacement?: "inside" | "outside" | "outside-left" | "outside-top";
  // Custom variant props for predefined styles
  customVariant?: keyof typeof inputVariants;
  customStyle?: "underlined" | "bordered" | "filled";
}

interface TextInputProps extends BaseInputProps {
  variant: "text" | "email" | "password";
  type?: "text" | "email" | "password";
}

const Input = (props: TextInputProps) => {
  const {
    value,
    onChange,
    isInvalid = false,
    errorMessage = "",
    color = "default",
    label,
    placeholder,
    required = false,
    size = "lg",
    description,
    className,
    labelPlacement,
    customVariant,
    customStyle = "underlined",
  } = props;

  // Get custom variant classes if specified
  const customVariantClass =
    customVariant && customStyle
      ? inputVariants[customVariant][customStyle]
      : "";

  // Handle Text Inputs (text, email, password)
  const { variant, type } = props;

  // Determine input type based on variant
  const inputType =
    type ||
    (variant === "email"
      ? "email"
      : variant === "password"
      ? "password"
      : "text");

  const finalClasses = [customVariantClass, className]
    .filter(Boolean)
    .join(" ");

  // If using custom variant, apply custom styling with better override support
  if (customVariant) {
    const heroVariant =
      customStyle === "filled"
        ? "flat"
        : customStyle === "bordered"
        ? "bordered"
        : "underlined";

    return (
      <HeroInput
        type={inputType}
        variant={heroVariant}
        radius="none"
        size={size}
        label={label}
        placeholder={placeholder}
        value={value}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        description={description}
        onChange={(e) => onChange(e.target.value)}
        isRequired={required}
        className={finalClasses}
        classNames={{
          base: "group",
          mainWrapper: "h-full",
          inputWrapper: [
            "bg-transparent border-inherit transition-all duration-200",
            // Allow className to override these base styles
            "!bg-transparent !border-inherit",
          ],
          input: [
            "text-inherit placeholder:text-inherit/60",
            // Allow custom text colors to be overridden
            "data-[has-value=true]:text-inherit",
          ],
          label: "text-inherit/80 group-data-[filled-within=true]:text-inherit",
          errorMessage: "text-inherit",
          description: "text-inherit/70",
        }}
        style={
          {
            // Reset default styles to allow full customization
            "--input-color": "inherit",
            "--input-bg": "transparent",
          } as React.CSSProperties
        }
      />
    );
  }

  // Default HeroUI styling
  return (
    <HeroInput
      type={inputType}
      variant="underlined"
      radius="none"
      size={size}
      label={label}
      placeholder={placeholder}
      value={value}
      isInvalid={isInvalid}
      color={color}
      errorMessage={errorMessage}
      description={description}
      onChange={(e) => onChange(e.target.value)}
      isRequired={required}
      className={finalClasses}
    />
  );
};

export default Input;
