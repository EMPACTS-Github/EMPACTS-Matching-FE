import React from 'react';

interface ResendCodeButtonProps {
  isDisabled: boolean;
  countdown?: number;
  onClick: () => void;
  className?: string;
}

function ResendCodeButton({
  isDisabled,
  countdown = 0,
  onClick,
  className = ''
}: ResendCodeButtonProps) {
  const baseClasses = 'cursor-pointer';
  const disabledClasses = 'text-purple-400 cursor-not-allowed';
  const enabledClasses = 'text-purple-600';
  
  const finalClasses = `${baseClasses} ${isDisabled ? disabledClasses : enabledClasses} ${className}`;

  return (
    <span
      onClick={isDisabled ? undefined : onClick}
      className={finalClasses}
    >
      {isDisabled ? `Resend code(${countdown}s)` : 'Resend code'}
    </span>
  );
}

export default ResendCodeButton;
