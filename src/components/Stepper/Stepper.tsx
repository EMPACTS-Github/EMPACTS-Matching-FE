'use client';
import React from 'react';

export interface StepperStep {
  id: string | number;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep?: number;
  className?: string;
  showNumbers?: boolean;
  showLabels?: boolean;
  variant?: 'default' | 'compact';
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep = 0,
  className = '',
  showNumbers = true,
  showLabels = true,
  variant = 'default'
}) => {
  const getStepStatus = (index: number) => {
    if (index === currentStep) return 'active';
    if (index < currentStep) return 'completed';
    return 'pending';
  };

  const getStepStyles = (status: string) => {
    const baseStyles = 'w-12 h-12 rounded-full border border-primary flex items-center justify-center font-bold text-xl transition-all duration-200';
    
    switch (status) {
      case 'active':
        return `${baseStyles} bg-primary text-white`;
      case 'completed':
        return `${baseStyles} bg-purple-100 text-black`;
      case 'pending':
        return `${baseStyles} bg-purple-100 text-black`;
      default:
        return baseStyles;
    }
  };

  const getLabelStyles = (status: string) => {
    const baseStyles = 'text-center font-bold text-base transition-all duration-200';
    
    switch (status) {
      case 'active':
        return `${baseStyles} text-primary`;
      case 'completed':
        return `${baseStyles} text-black`;
      case 'pending':
        return `${baseStyles} text-black`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex flex-col items-center w-full">
        {/* Step Numbers with Lines */}
        <div className="flex items-center justify-center w-full">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={step.id}>
                {/* Step Number */}
                {showNumbers && (
                  <div className={getStepStyles(status)}>
                    {step.isCompleted ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                )}
                
                {/* Connecting Line */}
                {!isLast && (
                  <div className="w-32 h-0.5 bg-primary" />
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Step Labels */}
        {showLabels && (
          <div className="flex items-center justify-center w-full mt-2">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const isLast = index === steps.length - 1;
              
              return (
                <React.Fragment key={`label-${step.id}`}>
                  <div className={`w-12 flex justify-center ${getLabelStyles(status)}`}>
                    {step.label}
                  </div>
                  
                  {/* Spacer for alignment */}
                  {!isLast && (
                    <div className="w-32" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stepper;
