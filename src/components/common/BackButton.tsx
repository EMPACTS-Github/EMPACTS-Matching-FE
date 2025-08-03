import React from 'react';
import Image from 'next/image';
import ArrowLeftIcon from '/public/assets/arrow_left.svg';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

function BackButton({ 
  onClick, 
  className = 'absolute left-10 hover:bg-gray-300 rounded-lg' 
}: BackButtonProps) {
  return (
    <div className={className} onClick={onClick}>
      <Image src={ArrowLeftIcon} alt="Arrow left icon" width={40} height={40} />
    </div>
  );
}

export default BackButton;
