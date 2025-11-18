
import React from 'react';
import { useAudio } from '../hooks/useAudio';

interface ZooButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const ZooButton: React.FC<ZooButtonProps> = ({ children, color = 'bg-brand-blue', className = '', ...props }) => {
  const { playClick } = useAudio();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    playClick();
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`font-display text-white text-xl md:text-3xl px-6 py-3 md:px-10 md:py-4 rounded-full shadow-lg transform transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ring-white/50 ${color} ${className}`}
    >
      {children}
    </button>
  );
};

export default ZooButton;
