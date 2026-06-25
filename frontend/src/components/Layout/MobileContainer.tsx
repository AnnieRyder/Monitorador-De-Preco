// frontend/src/components/Layout/MobileContainer.tsx
import React from 'react';
import './MobileContainer.css'; 

interface Props {
  children: React.ReactNode;
}

export const MobileContainer = ({ children }: Props) => {
  return (
    <div className="mobile-container">
      {children}
    </div>
  );
};