import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  className?: string;
}

function LoadingOverlay({ 
  isVisible, 
  className = "absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50" 
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className={className}>
      <div className="loader"></div>
    </div>
  );
}

export default LoadingOverlay;
