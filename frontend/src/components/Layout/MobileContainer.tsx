// frontend/src/components/Layout/MobileContainer.tsx
import React from 'react';
import './MobileContainer.css'; // Vamos criar esse arquivo

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