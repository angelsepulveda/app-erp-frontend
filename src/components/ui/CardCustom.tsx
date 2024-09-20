import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export const CardCustom = ({ children, className = '', title }: CardProps) => (
  <div className={`rounded-lg bg-white p-8 shadow-md ${className}`}>
    {title && <h1 className="mb-6 text-2xl font-semibold text-[#00285E]">{title}</h1>}
    {children}
  </div>
);
